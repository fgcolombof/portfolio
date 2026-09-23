import { useState, useEffect } from "react";
import Result from "./components/Result";
import { Link } from "react-router-dom";

const QuizApp = () => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  // Fetch a la Mock API
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch("http://localhost:3001/quiz");
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        setQuiz(data);
        // Inicializamos los valores en null una vez que cargaron las preguntas
        setAnswers(Array(data.content.length).fill(null));
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, []);

  // Si está cargando o no hay quiz, mostramos el mensaje de carga
  if (loading || !quiz) {
    return (
      <div className="quiz-container">
        <p className="empty-text">Loading quiz questions...</p>
      </div>
    );
  }

  // 1. DERIVAR ESTADO
  const currentSelectedAnswer = answers[currentStep];
  const isAnswerSelected =
    currentSelectedAnswer !== undefined && currentSelectedAnswer !== null;

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < quiz.content.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleOptionSelect = (optionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentStep] =
      quiz.content[currentStep].options[optionIndex];
    setAnswers(updatedAnswers);
  };

  const isFinished = () => currentStep !== quiz.content.length;

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers(Array(quiz.content.length).fill(null));
  };

  return (
    <>
      <div className="quiz-container">
        <h2 className="quiz-title">{quiz.title}</h2>

        {isFinished() ? (
          <>
            <div className="quiz-question">
              {quiz.content[currentStep].question}
            </div>
            <div className="quiz-options">
              {quiz.content[currentStep].options.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  className={`quiz-option-btn ${
                    answers[currentStep] === option ? "selected" : ""
                  }`}
                  onClick={() => handleOptionSelect(index)}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="quiz-nav-buttons">
              <button
                type="button"
                className="quiz-nav-btn"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                Previous
              </button>

              <button
                type="button"
                className={`quiz-nav-btn ${!isAnswerSelected ? "disabled" : ""}`}
                onClick={handleNext}
                disabled={!isAnswerSelected}
              >
                {currentStep === quiz.content.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </>
        ) : (
          <Result quiz={quiz} answers={answers} onRestart={handleReset} />
        )}
      </div>
      <br />
      {/* FOOTER / BACK */}
      <div style={{ marginTop: "3rem" }}>
        <Link to="/" style={styles.backLink}>
          ← Back to Showroom
        </Link>
      </div>
    </>
  );
};

const styles = {
  backLink: {
    color: "var(--accent-yellow)",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default QuizApp;
