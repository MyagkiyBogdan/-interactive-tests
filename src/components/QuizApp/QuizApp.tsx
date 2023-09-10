import React, { useState } from "react";
import { questionsData } from "../../questionsData/questionsData";
import styles from "./QuizApp.module.css";
import { answerColors } from "utils/answerColors";
import { Question } from "types/questionsDataTypes";

const QuizApp: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(questionsData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleAnswerClick = (selectedAnswerIndex: number) => {
    const correctAnswerIndex = questions[currentQuestionIndex].correct;

    if (selectedAnswerIndex === correctAnswerIndex) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowResult(true);
    }
  };

  const handlePreviousClick = () => {
    const previousQuestionIndex = currentQuestionIndex - 1;
    if (previousQuestionIndex >= 0) {
      setCurrentQuestionIndex(previousQuestionIndex);
    }
  };

  const handleNextClick = () => {
    if (showResult) {
      setQuestions(questionsData);
      setCurrentQuestionIndex(0);
      setScore(0);
      setShowResult(false);
    } else {
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
      }
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className={styles.quizContainer}>
      <h1>Тест по программированию</h1>
      {!showResult ? (
        <div className={styles.questionContainer}>
          <p>{currentQuestion.questionText}</p>
          <div className={styles.answerContainer}>
            {currentQuestion.answers.map((answer, index) => (
              <div key={index} className={styles.answerItem}>
                <button
                  onClick={() => handleAnswerClick(index)}
                  style={{
                    backgroundColor: answerColors[index % answerColors.length],
                  }}
                >
                  {answer}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.resultContainer}>
          <p>Тест завершен!</p>
          <p>
            Вы правильно ответили на {score} из {questions.length} вопросов.
          </p>
        </div>
      )}
      <div className={styles.buttonContainer}>
        <button
          onClick={handlePreviousClick}
          disabled={currentQuestionIndex === 0}
        >
          Предыдущий вопрос
        </button>
        <button
          onClick={handleNextClick}
          disabled={showResult || currentQuestionIndex === questions.length - 1}
        >
          {showResult ? "Начать заново" : "Следующий вопрос"}
        </button>
      </div>
    </div>
  );
};

export default QuizApp;
