"use client";

import { Wallet, ConnectWallet } from "@coinbase/onchainkit/wallet";
import { Avatar, Name } from "@coinbase/onchainkit/identity";
import PayToPlay from "./PayToPlay";

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
  isConnected,
  address,
  hasPaidSession,
  needsContinueFee,
  onPaidAndPlay,
}) {
  // Precedence: wallet connection > pay-to-continue (after a low score) >
  // pay-to-start (once per session) > the normal Play button. Checking
  // needsContinueFee here too (not just on the result screen) means going
  // "Back" instead of paying can't be used to skip the fee.
  const canPlayFree = isConnected && hasPaidSession && !needsContinueFee;

  return (
    <div className="container" id="homeScreen">
      {!isConnected ? (
        <div className="walletGate">
          <p className="walletGateText">
            🔐 Connect your wallet to play Quizverse and save your progress
            onchain.
          </p>
          <Wallet>
            <ConnectWallet>
              <Avatar className="h-6 w-6" />
              <Name />
            </ConnectWallet>
          </Wallet>
        </div>
      ) : (
        <div className="walletConnected">
          <Wallet>
            <ConnectWallet>
              <Avatar className="h-5 w-5" />
              <Name />
            </ConnectWallet>
          </Wallet>
        </div>
      )}

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

      {isConnected && needsContinueFee && (
        <PayToPlay
          label="Pay ~$0.002 to Continue"
          message="😅 You scored below 5/10 last round - pay a tiny fee to keep playing."
          onPaid={onPaidAndPlay}
        />
      )}

      {isConnected && !needsContinueFee && !hasPaidSession && (
        <PayToPlay
          label="Pay ~$0.002 to Start Playing"
          message="🎮 A small one-time fee unlocks play for this visit."
          onPaid={onPaidAndPlay}
        />
      )}

      <button id="playBtn" onClick={onPlay} disabled={!canPlayFree}>
        {!isConnected
          ? "🔒 Connect Wallet to Play"
          : !canPlayFree
          ? "🔒 Pay Above to Play"
          : "▶ Play"}
      </button>
      <button id="rankingBtn" onClick={onShowRanking}>
        🏆 Leaderboard
      </button>

      <p className="version">Version 0.1</p>
    </div>
  );
}
