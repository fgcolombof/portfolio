import React from "react";

export const Result = ({ answers, quiz, onRestart }) => {
  //   console.log(`Final answers: ${answers}`);
  // 1. Calculamos la cantidad de aciertos comparando los índices
  const score = answers.reduce((acc, selectedOptionIndex, index) => {
    let correctAnswer = quiz.content[index].answer;
    let selectedAnswer = answers[index];

    // console.log(
    //   `Type of selectedAnswer: ${typeof selectedAnswer}, Type of correctAnswer: ${typeof correctAnswer}`,
    // );

    // console.log(
    //   `Question ${index + 1}: Selected Answer = ${selectedAnswer}, Correct Answer = ${correctAnswer}, Result: ${selectedAnswer == correctAnswer ? "Correct" : "Wrong"}`,
    // );
    const corrects = selectedAnswer === correctAnswer ? acc + 1 : acc;
    return corrects;
  }, 0);

  const totalQuestions = quiz.content.length;
  //   console.log(`Score: ${score} out of totalQuestions${totalQuestions}`);
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
          const userChoiceIndex = answers[index];
          const isCorrect = userChoiceIndex == item.answer;
          {
            /*console.log(
              `Question ${index + 1} - ${quiz.content[index].question}: User Choice Index = ${userChoiceIndex}, Correct Answer = ${item.answer}. Result: ${isCorrect ? "Correct" : "Wrong"}`,
            );*/
          }

          // Si contestó la opción o no respondió
          const userChoiceText =
            userChoiceIndex !== null && userChoiceIndex !== undefined
              ? item.options[userChoiceIndex]
              : "Sin responder";

          const correctAnswerText = item.options[index];

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
                  <strong>{userChoiceText}</strong>
                </div>

                {/* Si le erró, mostramos cuál era la correcta */}
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
