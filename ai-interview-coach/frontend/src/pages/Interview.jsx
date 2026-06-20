import { useState } from "react";
import axios from "axios";

export default function Interview({ sessionData, setSessionData, onFinish, onHome }) {
  const { jobRole, difficulty, questions, currentQuestion, results } = sessionData;
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [answered, setAnswered] = useState(false);

  const progress = ((currentQuestion) / questions.length) * 100;

  const handleSubmit = async () => {
    if (!answer.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/api/interview/evaluate", {
        jobRole,
        question: questions[currentQuestion],
        userAnswer: answer,
        difficulty
      });
      setFeedback(res.data);
      setAnswered(true);
      const newResults = [...results, { question: questions[currentQuestion], answer, evaluation: res.data }];
      setSessionData(prev => ({ ...prev, results: newResults }));
    } catch (e) {
      alert("Evaluation failed. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    const newResults = sessionData.results;
    if (currentQuestion + 1 >= questions.length) {
      onFinish(newResults);
    } else {
      setSessionData(prev => ({ ...prev, currentQuestion: prev.currentQuestion + 1 }));
      setAnswer("");
      setFeedback(null);
      setAnswered(false);
    }
  };

  const scoreColor = (score) => {
    if (score >= 8) return "#22c55e";
    if (score >= 6) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="interview-container">
      {/* Header */}
      <div className="interview-header">
        <div className="header-left">
          <button className="back-btn" onClick={onHome}>← Home</button>
          <span className="role-badge">🎯 {jobRole}</span>
          <span className={`diff-badge diff-${difficulty}`}>{difficulty.toUpperCase()}</span>
        </div>
        <div className="question-counter">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Question */}
      <div className="question-card">
        <div className="question-number">Q{currentQuestion + 1}</div>
        <p className="question-text">{questions[currentQuestion]}</p>
      </div>

      {/* Answer Area */}
      {!answered && (
        <div className="answer-section">
          <textarea
            placeholder="Type your answer here... Be specific, use examples from your experience!"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            rows={6}
          />
          <div className="answer-actions">
            <span className="word-count">{answer.split(" ").filter(w => w).length} words</span>
            <button className="submit-btn" onClick={handleSubmit} disabled={loading || !answer.trim()}>
              {loading ? "⏳ Evaluating..." : "✅ Submit Answer"}
            </button>
          </div>
        </div>
      )}

      {/* Feedback Section */}
      {feedback && (
        <div className="feedback-section">
          {/* Score */}
          <div className="score-card">
            <div className="score-circle" style={{ borderColor: scoreColor(feedback.score) }}>
              <span className="score-number" style={{ color: scoreColor(feedback.score) }}>
                {feedback.score}
              </span>
              <span className="score-label">/10</span>
            </div>
            <div className="score-info">
              <div className="grade-badge">Grade: {feedback.grade}</div>
              <p className="feedback-text">{feedback.feedback}</p>
            </div>
          </div>

          {/* Strengths & Improvements */}
          <div className="feedback-grid">
            <div className="feedback-box strengths-box">
              <h4>✅ Strengths</h4>
              <ul>{feedback.strengths?.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
            <div className="feedback-box improvements-box">
              <h4>⚠️ Improvements</h4>
              <ul>{feedback.improvements?.map((imp, i) => <li key={i}>{imp}</li>)}</ul>
            </div>
          </div>

          {/* Ideal Answer */}
          <div className="ideal-answer-box">
            <h4>💡 Ideal Answer</h4>
            <p>{feedback.idealAnswer}</p>
          </div>

          {/* Tip */}
          <div className="tip-box">
            <span>🎯 Pro Tip: </span>{feedback.tip}
          </div>

          {/* Next Button */}
          <button className="next-btn" onClick={handleNext}>
            {currentQuestion + 1 >= questions.length ? "📊 View Final Results" : "Next Question →"}
          </button>
        </div>
      )}
    </div>
  );
}
