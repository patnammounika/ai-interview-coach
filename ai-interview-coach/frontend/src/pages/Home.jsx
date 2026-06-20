import { useState } from "react";
import axios from "axios";

const JOB_ROLES = [
  "Software Engineer", "Java Developer", "Python Developer",
  "Full Stack Developer", "Data Analyst", "AI/ML Engineer",
  "Application Support Engineer", "DevOps Engineer",
  "Frontend Developer", "Backend Developer"
];

export default function Home({ onStart }) {
  const [jobRole, setJobRole] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStart = async () => {
    const role = jobRole === "custom" ? customRole : jobRole;
    if (!role) { setError("Please select or enter a job role!"); return; }
    setError("");
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8080/api/interview/questions`, {
        params: { jobRole: role, difficulty, count: 5 }
      });
      onStart(role, difficulty, res.data.questions);
    } catch (e) {
      setError("Failed to generate questions. Make sure backend is running!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="hero">
        <div className="hero-icon">🎯</div>
        <h1>AI Interview Coach</h1>
        <p>Practice interviews with AI feedback. Get scored, improve, and get hired!</p>
      </div>

      <div className="setup-card">
        <h2>Set Up Your Interview</h2>

        <div className="form-group">
          <label>Select Job Role</label>
          <select value={jobRole} onChange={e => setJobRole(e.target.value)}>
            <option value="">-- Select a Role --</option>
            {JOB_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            <option value="custom">Custom Role...</option>
          </select>
        </div>

        {jobRole === "custom" && (
          <div className="form-group">
            <label>Enter Your Role</label>
            <input
              type="text"
              placeholder="e.g. Cloud Engineer"
              value={customRole}
              onChange={e => setCustomRole(e.target.value)}
            />
          </div>
        )}

        <div className="form-group">
          <label>Difficulty Level</label>
          <div className="difficulty-buttons">
            {["easy", "medium", "hard"].map(d => (
              <button
                key={d}
                className={`diff-btn ${difficulty === d ? "active-" + d : ""}`}
                onClick={() => setDifficulty(d)}
              >
                {d === "easy" ? "🟢 Easy" : d === "medium" ? "🟡 Medium" : "🔴 Hard"}
              </button>
            ))}
          </div>
        </div>

        {error && <div className="error-box">{error}</div>}

        <button className="start-btn" onClick={handleStart} disabled={loading}>
          {loading ? "⏳ Generating Questions..." : "🚀 Start Interview"}
        </button>

        <div className="features">
          <div className="feature">⚡ AI-Powered Evaluation</div>
          <div className="feature">📊 Score out of 10</div>
          <div className="feature">💡 Ideal Answer Shown</div>
          <div className="feature">🎯 5 Questions per Session</div>
        </div>
      </div>
    </div>
  );
}
