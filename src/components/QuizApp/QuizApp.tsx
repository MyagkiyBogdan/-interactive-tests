import React, { useState } from "react";
import { questionsData } from "../../testData/questionsData";
import styles from "./QuizApp.module.css";

interface Question {
  questionText: string;
  answers: string[];
  correct: number;
}

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
          {currentQuestion.answers.map((answer, index) => (
            <button key={index} onClick={() => handleAnswerClick(index)}>
              {answer}
            </button>
          ))}
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
          className={`${styles.quizButton} ${styles.button}`}
        >
          Предыдущий вопрос
        </button>
        <button
          onClick={handleNextClick}
          disabled={showResult || currentQuestionIndex === questions.length - 1}
          className={`${styles.quizButton} ${styles.button}`}
        >
          {showResult ? "Начать заново" : "Следующий вопрос"}
        </button>
      </div>
    </div>
  );
};

export default QuizApp;
