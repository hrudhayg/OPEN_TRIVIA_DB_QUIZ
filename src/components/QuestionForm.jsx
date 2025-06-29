// components/QuestionForm.jsx
import { useState } from "react";

const QuestionForm = ({ questionData, onSubmit }) => {
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");

  const allAnswers = [...questionData.incorrect_answers, questionData.correct_answer]
    .sort(() => Math.random() - 0.5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected) {
      setError("Please select an answer.");
      return;
    }
    setError("");
    onSubmit(selected);
  };

  return (
    <div className="card p-4 shadow-lg rounded">
      <h2 className="card-title mb-3">Question</h2>
      <p className="card-text mb-4">{questionData.question}</p>
      <form onSubmit={handleSubmit}>
        {allAnswers.map((answer, idx) => (
          <div className="form-check" key={idx}>
            <input
              className="form-check-input"
              type="radio"
              name="answer"
              id={`answer-${idx}`}
              value={answer}
              onChange={(e) => setSelected(e.target.value)}
            />
            <label className="form-check-label" htmlFor={`answer-${idx}`}>
              {answer}
            </label>
          </div>
        ))}

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        <button type="submit" className="btn btn-success mt-4">
          Submit Answer
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;
