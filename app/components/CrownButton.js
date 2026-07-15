"use client";

import { useState } from "react";

export default function CrownButton({ playerProfile }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="crownButton"
        onClick={() => setOpen((o) => !o)}
        aria-label="Profile"
      >
        👑
      </button>

      {open && (
        <>
          <div className="menuOverlay" onClick={() => setOpen(false)} />
          <div className="profilePanel">
            <p className="profileName">{playerProfile.username || "Explorer"}</p>
            <p className="profileLine">⚔️ {playerProfile.title}</p>
            <p className="profileLine">🏆 {playerProfile.totalPoints} points</p>
            <p className="profileLine">📚 {playerProfile.levelsCompleted} levels completed</p>
          </div>
        </>
      )}
    </>
  );
}
