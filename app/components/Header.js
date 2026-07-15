"use client";

import MenuButton from "./MenuButton";

// Shared top bar rendered above every screen: menu (top-left) and the game
// logo block with its decorative divider.
export default function Header({ onNavigate }) {
  return (
    <>
      <MenuButton onNavigate={onNavigate} />
      <div className="gameHeader">
        <h1>🌌 Quizverse</h1>
        <p className="subtitle">A Universe of Knowledge Awaits</p>
        <div className="headerDivider">◆ • ◆ • ◆</div>
      </div>
    </>
  );
}
