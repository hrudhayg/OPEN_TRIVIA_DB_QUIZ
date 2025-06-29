// components/Result.jsx
const Result = ({ name, correctAnswer, selectedAnswer, onRestart }) => {
    const isCorrect = selectedAnswer === correctAnswer;
  
    return (
      <div className="card p-4 shadow-sm text-center">
        <h2 className="card-title mb-3">Result</h2>
        <p className={`mb-4 fs-5 ${isCorrect ? "text-success" : "text-danger"}`}>
          {isCorrect
            ? `🎉 Great job, ${name}! You got it right!`
            : `🙁 Sorry, ${name}. That's not correct.`}
        </p>
  
        {!isCorrect && (
          <p className="mb-4 fw-bold">
            The correct answer was: <span className="text-primary">{correctAnswer}</span>
          </p>
        )}
  
        <button onClick={onRestart} className="btn btn-primary">
          Try Another Question
        </button>
      </div>
    );
  };
  
  export default Result;
  