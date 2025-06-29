// App.jsx
import { useState } from "react";
import Home from "./components/Home";
import QuestionForm from "./components/QuestionForm";
import Result from "./components/Result";
import he from "he";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [step, setStep] = useState("home");
  const [formData, setFormData] = useState({ name: "", category: "", difficulty: "" });
  const [questionData, setQuestionData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [error, setError] = useState("");

  const startQuiz = async (form) => {
    setFormData(form);
    try {
      const url = `https://opentdb.com/api.php?amount=1&category=${form.category}&difficulty=${form.difficulty}&type=multiple`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.results.length > 0) {
        const question = data.results[0];
        question.question = he.decode(question.question);
        question.correct_answer = he.decode(question.correct_answer);
        question.incorrect_answers = question.incorrect_answers.map((a) => he.decode(a));
        setQuestionData(question);
        setStep("question");
        setError("");
      } else {
        setError("No questions found. Try a different category.");
      }
    } catch {
      setError("API error. Try again later.");
    }
  };

  const submitAnswer = (answer) => {
    setSelectedAnswer(answer);
    setStep("result");
  };

  const restart = () => {
    setStep("home");
    setFormData({ name: "", category: "", difficulty: "" });
    setQuestionData(null);
    setSelectedAnswer("");
    setError("");
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#eef6ff", padding: "1rem" }}
    >
      {/* Colorful animated header */}
      <h1
        className="display-3 fw-bold mb-5 text-center"
        style={{
          background:
            "linear-gradient(90deg, #ff7e5f, #feb47b, #86a8e7, #91eae4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: "200% 200%",
          animation: "rainbow 2s linear infinite",
          userSelect: "none",
        }}
      >
        Open Trivia Quiz
      </h1>

      {/* Main content container */}
      <div className="container" style={{ maxWidth: "480px", width: "100%" }}>
        {step === "home" && <Home onStartQuiz={startQuiz} />}
        {step === "question" && questionData && (
          <QuestionForm questionData={questionData} onSubmit={submitAnswer} />
        )}
        {step === "result" && (
          <Result
            name={formData.name}
            correctAnswer={questionData.correct_answer}
            selectedAnswer={selectedAnswer}
            onRestart={restart}
          />
        )}
        {error && <div className="alert alert-danger mt-4">{error}</div>}
      </div>

      {/* Rainbow animation keyframes */}
      <style>{`
        @keyframes rainbow {
          0% {background-position:0% 50%;}
          50% {background-position:100% 50%;}
          100% {background-position:0% 50%;}
        }
      `}</style>
    </div>
  );
}

export default App;
