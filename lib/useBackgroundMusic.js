"use client";

import { useRef, useCallback } from "react";

// Ambient background loops (Google's free sound library - the same source
// as the original "Arcade Room" track). These are atmosphere loops, not
// composed music - real music tracks can be swapped in later by changing
// this list to point at hosted mp3/ogg files instead.
const PLAYLIST = [
  "https://actions.google.com/sounds/v1/ambiences/arcade_room.ogg",
  "https://actions.google.com/sounds/v1/ambiences/carnival_atmosphere.ogg",
  "https://actions.google.com/sounds/v1/ambiences/small_outdoor_marketplace.ogg",
  "https://actions.google.com/sounds/v1/ambiences/convention_hall_ambience_noise.ogg",
  "https://actions.google.com/sounds/v1/ambiences/warm_evening_outdoors.ogg",
];

function shuffledOrder(length) {
  const order = Array.from({ length }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

// Returns { start, stop }. `start()` begins playing the playlist, moving to
// a new (never-repeating-until-exhausted) track each time one ends, and
// never throws even if playback is blocked or a file fails to load.
export function useBackgroundMusic() {
  const audioRef = useRef(null);
  const orderRef = useRef([]);
  const positionRef = useRef(0);
  const startedRef = useRef(false);

  const playTrack = useCallback((index) => {
    if (typeof window === "undefined") return;
    const audio = new Audio(PLAYLIST[index]);
    audio.volume = 0.3;
    audioRef.current = audio;

    audio.addEventListener("ended", () => {
      positionRef.current += 1;
      if (positionRef.current >= orderRef.current.length) {
        orderRef.current = shuffledOrder(PLAYLIST.length);
        positionRef.current = 0;
      }
      playTrack(orderRef.current[positionRef.current]);
    });

    const p = audio.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {
        // Autoplay blocked or file failed to load - fail silently,
        // this should never break the game.
      });
    }
  }, []);

  const start = useCallback(() => {
    if (startedRef.current) return; // already playing, don't restart
    startedRef.current = true;
    orderRef.current = shuffledOrder(PLAYLIST.length);
    positionRef.current = 0;
    playTrack(orderRef.current[0]);
  }, [playTrack]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      try {
        audioRef.current.pause();
      } catch (e) {
        // ignore
      }
    }
    startedRef.current = false;
  }, []);

  return { start, stop };
}
