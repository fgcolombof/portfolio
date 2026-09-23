import React from "react";

export const Result = ({ answers, quiz, onRestart }) => {
  // 1. Calculamos la cantidad de aciertos comparando los textos de las respuestas
  const score = answers.reduce((acc, selectedAnswer, index) => {
    const correctAnswer = quiz.content[index].answer;
    const isCorrect = selectedAnswer === correctAnswer;
    return isCorrect ? acc + 1 : acc;
  }, 0);

  const totalQuestions = quiz.content.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="quiz-results-container">
      {/* 🏆 Banner del Puntaje Final */}
      <div className="quiz-score-banner">
        <h3>Resultado Final 🚀</h3>
        <p>
          Acertaste <strong>{score}</strong> de{" "}
          <strong>{totalQuestions}</strong> ({percentage}%)
        </p>
      </div>

      {/* 📝 Desglose Pregunta por Pregunta */}
      <div className="quiz-review-list">
        {quiz.content.map((item, index) => {
          const userChoiceText = answers[index];
          const correctAnswerText = item.answer;
          const isCorrect = userChoiceText === correctAnswerText;

          // Si no respondió
          const didNotAnswer = userChoiceText === null || userChoiceText === undefined;

          return (
            <div
              key={item.id || index}
              className={`quiz-review-item ${isCorrect ? "is-correct" : "is-wrong"}`}
            >
              <div className="quiz-review-question">
                {index + 1}. {item.question}
              </div>

              <div className="quiz-answer-detail">
                {/* Lo que eligió el usuario */}
                <div
                  className={`quiz-user-choice ${isCorrect ? "correct" : "wrong"}`}
                >
                  {isCorrect ? "✓ " : "✗ "}Tu respuesta:{" "}
                  <strong>{didNotAnswer ? "Sin responder" : userChoiceText}</strong>
                </div>

                {/* Si le erró o no respondió, mostramos cuál era la correcta */}
                {!isCorrect && (
                  <div className="quiz-correct-target">
                    💡 Respuesta correcta: <strong>{correctAnswerText}</strong>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔄 Botón de Reinicio */}
      <div className="quiz-result-actions">
        <button type="button" className="quiz-restart-btn" onClick={onRestart}>
          Volver a Intentar
        </button>
      </div>
    </div>
  );
};

export default Result;
