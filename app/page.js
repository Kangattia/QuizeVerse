"use client";

import { useEffect, useRef, useState } from "react";
import HomeScreen from "./components/HomeScreen";
import QuizScreen from "./components/QuizScreen";
import ResultScreen from "./components/ResultScreen";
import RankingScreen from "./components/RankingScreen";
import CreditsScreen from "./components/CreditsScreen";
import Header from "./components/Header";
import { getRoyalTitle } from "@/lib/ranks";
import { useSound } from "@/lib/useSound";
import { useBackgroundMusic } from "@/lib/useBackgroundMusic";

const STORAGE_KEY = "quizverseProfile";

const DEFAULT_PROFILE = {
  username: "",
  totalPoints: 0,
  title: "🌱 Kingdom Recruit",
  levelsCompleted: 0,
  completedLevels: [],
  answeredQuestions: [],
};

export default function Home() {
  const [screen, setScreen] = useState("home"); // home | quiz | result | ranking | credits
  const [selectedCategory, setSelectedCategory] = useState("History");
  const [playerProfile, setPlayerProfile] = useState(DEFAULT_PROFILE);
  const [lastResult, setLastResult] = useState({ score: 0, total: 0 });
  const loadedFromStorage = useRef(false);
  const play = useSound();
  const music = useBackgroundMusic();

  // Load saved profile once, on the client only
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setPlayerProfile(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Could not load saved profile:", e);
    } finally {
      loadedFromStorage.current = true;
    }
  }, []);

  // Persist profile locally whenever it changes
  useEffect(() => {
    if (!loadedFromStorage.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(playerProfile));
    } catch (e) {
      console.warn("Could not save profile:", e);
    }
  }, [playerProfile]);

  // Push to the shared leaderboard whenever the player has a name and points change
  useEffect(() => {
    if (!playerProfile.username) return;
    fetch("/api/leaderboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: playerProfile.username,
        totalPoints: playerProfile.totalPoints,
        title: playerProfile.title,
      }),
    }).catch((e) => console.warn("Could not sync leaderboard:", e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerProfile.totalPoints]);

  function handlePlay(name) {
    setPlayerProfile((prev) => ({
      ...prev,
      username: name,
      title: getRoyalTitle(prev.totalPoints),
    }));
    play("click");
    music.start(); // begins the rotating, never-repeating background playlist
    setScreen("quiz");
  }

  function handleFinish(score, total) {
    setLastResult({ score, total });
    setScreen("result");
  }

  return (
    <>
      <Header playerProfile={playerProfile} onNavigate={setScreen} />

      {screen === "home" && (
        <HomeScreen
          playerProfile={playerProfile}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onPlay={handlePlay}
          onShowRanking={() => setScreen("ranking")}
        />
      )}

      {screen === "quiz" && (
        <QuizScreen
          category={selectedCategory}
          playerProfile={playerProfile}
          setPlayerProfile={setPlayerProfile}
          onFinish={handleFinish}
          onBack={() => setScreen("home")}
        />
      )}

      {screen === "result" && (
        <ResultScreen
          score={lastResult.score}
          total={lastResult.total}
          onRestart={() => setScreen("quiz")}
          onHome={() => setScreen("home")}
        />
      )}

      {screen === "ranking" && (
        <RankingScreen onBack={() => setScreen("home")} />
      )}

      {screen === "credits" && (
        <CreditsScreen onBack={() => setScreen("home")} />
      )}
    </>
  );
}
