"use client";

import MenuButton from "./MenuButton";
import CrownButton from "./CrownButton";

// Shared top bar rendered above every screen: menu (top-left), crown/profile
// (top-right), and the game logo block with its decorative divider.
export default function Header({ playerProfile, onNavigate }) {
  return (
    <>
      <MenuButton onNavigate={onNavigate} />
      <CrownButton playerProfile={playerProfile} />
      <div className="gameHeader">
        <h1>🌌 Quizverse</h1>
        <p className="subtitle">A Universe of Knowledge Awaits</p>
        <div className="headerDivider">◆ • ◆ • ◆</div>
      </div>
    </>
  );
}
