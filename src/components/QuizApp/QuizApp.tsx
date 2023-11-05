import React, { useEffect, useState } from "react";
import { questionsData } from "../../questionsData/questionsData";
import styles from "./QuizApp.module.css";
import { answerColors } from "utils/answerColors";
import { Question, SingleQuestion } from "types/questionsDataTypes";
import axios from "axios";
import TestComponent from "components/TestComponent/TestComponent";
import {
  selectAllTests,
  selectUserAnswers,
  setTestsData,
} from "redux/testsSlice";
import { useDispatch, useSelector } from "react-redux";

const QuizApp: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(questionsData);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const dispatch = useDispatch();

  const allTests = useSelector(selectAllTests);
  const userAnswers = useSelector(selectUserAnswers);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/tests/all")
      .then((response) => {
        dispatch(setTestsData(response.data));
      })
      .catch((error) => {
        console.error("Ошибка при получении тестов:", error);
      });
  }, []);

  // const handleAnswerClick = (selectedAnswerIndex: number) => {
  //   const correctAnswerIndex = questions[currentQuestionIndex].correct;

  //   if (selectedAnswerIndex === correctAnswerIndex) {
  //     setScore(score + 1);
  //   }

  //   const nextQuestionIndex = currentQuestionIndex + 1;
  //   if (nextQuestionIndex < questions.length) {
  //     setCurrentQuestionIndex(nextQuestionIndex);
  //   } else {
  //     setShowResult(true);
  //   }
  // };

  const handlePreviousClick = () => {
    const previousQuestionIndex = currentQuestionIndex - 1;
    if (previousQuestionIndex >= 0) {
      setCurrentQuestionIndex(previousQuestionIndex);
    }
  };

  const handleNextClick = () => {
    if (showResult) {
      setCurrentQuestionIndex(0);
      setScore(0);
      setShowResult(false);
    } else {
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < allTests.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
      }
    }
  };

  const currentQuestion: SingleQuestion = allTests[currentQuestionIndex];

  console.log("test ", currentQuestion, currentQuestionIndex);

  return (
    <div className={styles.quizContainer}>
      <h1>Тестування з інформатики</h1>
      {!showResult ? (
        <TestComponent
          currentQuestion={currentQuestion}
          currentQuestionIndex={currentQuestionIndex}
        />
      ) : (
        <div className={styles.resultContainer}>
          <p>Тестування завершено!</p>
          <p>
            Вы вірно надали відповідь на {score} из {questions.length} питань.
          </p>
        </div>
      )}
      <div className={styles.buttonContainer}>
        <button
          onClick={handlePreviousClick}
          disabled={currentQuestionIndex === 0}
        >
          Попереднє питання
        </button>
        <button
          onClick={handleNextClick}
          disabled={showResult || currentQuestionIndex === allTests.length - 1}
        >
          {showResult ? "Почати ще раз" : "Наступне питання"}
        </button>
      </div>
    </div>
  );
};

export default QuizApp;
