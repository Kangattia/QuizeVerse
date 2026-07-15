"use client";

import { useState } from "react";

export default function MenuButton({ onNavigate }) {
  const [open, setOpen] = useState(false);

  function go(screen) {
    setOpen(false);
    onNavigate(screen);
  }

  return (
    <>
      <button
        className="menuButton"
        onClick={() => setOpen((o) => !o)}
        aria-label="Menu"
      >
        ⋮
      </button>

      {open && (
        <>
          <div className="menuOverlay" onClick={() => setOpen(false)} />
          <div className="menuPanel">
            <button onClick={() => go("home")}>🏠 Home</button>
            <button onClick={() => go("ranking")}>🏆 Leaderboard</button>
            <button onClick={() => go("credits")}>✨ Credits</button>
          </div>
        </>
      )}
    </>
  );
        }
