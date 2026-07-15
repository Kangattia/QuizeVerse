"use client";

export default function CreditsScreen({ onBack }) {
  return (
    <div className="container" id="creditsScreen">
      <div id="reward">👑</div>
      <h2>Credits</h2>

      <p className="creditsText">
        <strong>Quizverse</strong> started life as an idea called Wisdom
        Kingdom, rebuilt from the ground up into something bigger.
      </p>

      <p className="creditsText">
        It was created by <strong>Joel Kang</strong> — a boy born in
        Cameroon who fell in love with coding and decided to build a universe
        of knowledge for the world to play in.
      </p>

      <p className="creditsText">
        Built together with Claude (Anthropic), one line, one bug fix, and
        one big idea at a time.
      </p>

      <p className="creditsText">
        Thank you for playing. Every question answered adds another star to
        this ever-expanding universe. 🌌
      </p>

      <button id="backBtn" onClick={onBack}>
        🏠 Back
      </button>
    </div>
  );
          }
