export default function Results({ sessionData, onHome }) {
  const { jobRole, difficulty, results } = sessionData;

  const totalScore = results.reduce((sum, r) => sum + (r.evaluation?.score || 0), 0);
  const avgScore = results.length > 0 ? (totalScore / results.length).toFixed(1) : 0;

  const getGrade = (avg) => {
    if (avg >= 9) return { grade: "A+", msg: "Outstanding! 🌟 You're interview-ready!", color: "#22c55e" };
    if (avg >= 8) return { grade: "A", msg: "Excellent! 🎉 Great performance!", color: "#22c55e" };
    if (avg >= 7) return { grade: "B", msg: "Good job! 👍 A little more practice needed.", color: "#3b82f6" };
    if (avg >= 6) return { grade: "C", msg: "Average. 📚 Keep practicing!", color: "#f59e0b" };
    return { grade: "D", msg: "Needs improvement. 💪 Don't give up!", color: "#ef4444" };
  };

  const { grade, msg, color } = getGrade(parseFloat(avgScore));

  return (
    <div className="results-container">
      {/* Summary Card */}
      <div className="results-hero">
        <h1>Interview Complete! 🎯</h1>
        <p>{jobRole} — {difficulty.toUpperCase()} Level</p>

        <div className="final-score-card">
          <div className="final-score" style={{ color }}>
            {avgScore}<span>/10</span>
          </div>
          <div className="final-grade" style={{ background: color }}>Grade: {grade}</div>
          <p className="final-msg">{msg}</p>
        </div>

        <div className="stats-row">
          <div className="stat-box">
            <div className="stat-number">{results.length}</div>
            <div className="stat-label">Questions</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">{results.filter(r => r.evaluation?.score >= 7).length}</div>
            <div className="stat-label">Good Answers</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">{results.filter(r => r.evaluation?.score < 6).length}</div>
            <div className="stat-label">Need Work</div>
          </div>
        </div>
      </div>

      {/* Per Question Review */}
      <div className="review-section">
        <h2>📋 Detailed Review</h2>
        {results.map((r, i) => (
          <div key={i} className="review-card">
            <div className="review-header">
              <span className="review-q">Q{i + 1}: {r.question}</span>
              <span className="review-score" style={{
                background: r.evaluation?.score >= 7 ? "#22c55e" : r.evaluation?.score >= 5 ? "#f59e0b" : "#ef4444"
              }}>
                {r.evaluation?.score}/10
              </span>
            </div>
            <div className="review-your-answer">
              <strong>Your Answer:</strong> {r.answer}
            </div>
            <div className="review-ideal">
              <strong>💡 Ideal Answer:</strong> {r.evaluation?.idealAnswer}
            </div>
            <div className="review-tip">
              🎯 {r.evaluation?.tip}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="results-actions">
        <button className="home-btn" onClick={onHome}>🏠 Practice Again</button>
      </div>
    </div>
  );
}
