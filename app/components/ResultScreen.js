"use client";

import PayToPlay from "./PayToPlay";

function getResultMessage(score, total) {
  if (score === total) return "👑 Legendary! You are a true Knowledge King!";
  if (score >= total * 0.7) return "🌟 Excellent! The Quizverse celebrates your wisdom!";
  if (score >= total * 0.5) return "👍 Good effort! Keep improving!";
  return "📚 Keep learning. Great minds grow every day!";
}

export default function ResultScreen({
  score,
  total,
  onRestart,
  onHome,
  needsContinueFee,
  onPaidAndPlay,
}) {
  return (
    <div className="container" id="resultScreen">
      <div id="reward">👑</div>
      <div id="confetti" />
      <h2>🏆 Quiz Complete!</h2>

      <p id="finalScore">
        Your Score: {score}/{total}
      </p>
      <p id="resultMessage">{getResultMessage(score, total)}</p>

      {needsContinueFee ? (
        <PayToPlay
          label="Pay ~$0.002 to Continue"
          message="😅 That's below 5/10 - pay a tiny fee to keep playing."
          onPaid={onPaidAndPlay}
        />
      ) : (
        <button id="restartBtn" onClick={onRestart}>
          🔄 Play Again
        </button>
      )}

      <button id="backBtn" onClick={onHome}>
        🏠 Back
      </button>
    </div>
  );
}
