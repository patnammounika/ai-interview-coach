import { useState } from "react";
import Home from "./pages/Home";
import Interview from "./pages/Interview";
import Results from "./pages/Results";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [sessionData, setSessionData] = useState({
    jobRole: "",
    difficulty: "medium",
    questions: [],
    currentQuestion: 0,
    answers: [],
    results: [],
  });

  const goToInterview = (jobRole, difficulty, questions) => {
    setSessionData({ ...sessionData, jobRole, difficulty, questions, currentQuestion: 0, answers: [], results: [] });
    setPage("interview");
  };

  const goToResults = (results) => {
    setSessionData((prev) => ({ ...prev, results }));
    setPage("results");
  };

  const goHome = () => {
    setPage("home");
    setSessionData({ jobRole: "", difficulty: "medium", questions: [], currentQuestion: 0, answers: [], results: [] });
  };

  return (
    <div className="app">
      {page === "home" && <Home onStart={goToInterview} />}
      {page === "interview" && <Interview sessionData={sessionData} setSessionData={setSessionData} onFinish={goToResults} onHome={goHome} />}
      {page === "results" && <Results sessionData={sessionData} onHome={goHome} />}
    </div>
  );
}

export default App;
