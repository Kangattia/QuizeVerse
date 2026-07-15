"use client";

import { useState } from "react";

const CATEGORIES = [
  { key: "History", icon: "🌍", label: "History" },
  { key: "Bible", icon: "✝️", label: "Bible" },
  { key: "Science", icon: "🔬", label: "Science" },
  { key: "Geography", icon: "🌍", label: "Geography" },
  { key: "World", icon: "🌐", label: "World" },
  { key: "Sports", icon: "⚽", label: "Sports" },
  { key: "GeneralKnowledge", icon: "🧠", label: "General Knowledge" },
  { key: "Religion", icon: "🕊️", label: "World Religions" },
];

export default function HomeScreen({
  playerProfile,
  selectedCategory,
  onSelectCategory,
  onPlay,
  onShowRanking,
}) {
  const [nameInput, setNameInput] = useState(playerProfile.username || "");

  function handlePlay() {
    const trimmed = nameInput.trim();
    if (trimmed === "") {
      alert("🌌 Enter your explorer name to continue!");
      return;
    }
    onPlay(trimmed);
  }

  return (
    <div className="container" id="homeScreen">
      <input
        id="playerNameInput"
        type="text"
        placeholder="Enter your explorer name"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
      />

      <div className="playerCard">
        <span className="playerCardTitle">⚔️ {playerProfile.title}</span>
        <div className="playerCardStats">
          <span>🏆 {playerProfile.totalPoints} pts</span>
          <span>📚 {playerProfile.levelsCompleted} levels</span>
        </div>
      </div>

      <div className="categoryGrid">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            className={
              "categoryCard cat-" +
              cat.key +
              (selectedCategory === cat.key ? " selected" : "")
            }
            onClick={() => onSelectCategory(cat.key)}
          >
            <span className="iconBadge">{cat.icon}</span>
            <span className="categoryLabel">{cat.label}</span>
          </button>
        ))}
      </div>

      <button id="playBtn" onClick={handlePlay}>
        ▶ Play
      </button>
      <button id="rankingBtn" onClick={onShowRanking}>
        🏆 Leaderboard
      </button>

      <p className="version">Version 0.1</p>
    </div>
  );
}
