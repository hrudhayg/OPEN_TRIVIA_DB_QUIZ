// components/Home.jsx
import { useState } from "react";

const Home = ({ onStartQuiz }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    difficulty: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, category, difficulty } = formData;
    if (!name || !category || !difficulty) {
      setError("All fields are required.");
      return;
    }
    setError("");
    onStartQuiz(formData);
  };

  return (
    <div className="card p-4 shadow-lg rounded">
      <h3 className="card-text mb-4">
        Please Enter the Details to begin : 
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your first name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select category</option>
            <option value="9">General Knowledge</option>
            <option value="17">Science & Nature</option>
            <option value="23">History</option>
            <option value="21">Sports</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="difficulty" className="form-label">
            Difficulty
          </label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-primary mt-3">
          Start Quiz
        </button>
      </form>
    </div>
  );
};

export default Home;
