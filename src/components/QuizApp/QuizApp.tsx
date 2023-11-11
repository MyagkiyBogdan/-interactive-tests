import React, { useEffect, useState } from "react";
import styles from "./QuizApp.module.css";
import { SingleQuestion } from "types/questionsDataTypes";
import axios from "axios";
import TestComponent from "components/TestComponent/TestComponent";
import {
  selectAllTests,
  selectIsTestCompleted,
  selectUserAnswers,
  selectUserCorrectAnswersCounter,
  setIsTestCompleted,
  setTestsData,
  setUserCorrectAnswersCounter,
  setUserTestResult,
} from "redux/testsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "redux/userSlice";
import { USER_ROLE } from "constants/userConstants";
import { UserRole } from "types/reduxTypes";
import { Link } from "react-router-dom";

const QuizApp: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const dispatch = useDispatch();

  const allTests = useSelector(selectAllTests);
  const userAnswers = useSelector(selectUserAnswers);
  const isTestCompeted = useSelector(selectIsTestCompleted);
  const score = useSelector(selectUserCorrectAnswersCounter);
  const userInfo = useSelector(selectUserInfo);

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

  const handlePreviousClick = () => {
    const previousQuestionIndex = currentQuestionIndex - 1;
    if (previousQuestionIndex >= 0) {
      setCurrentQuestionIndex(previousQuestionIndex);
    }
  };
  const isLastTest = currentQuestionIndex === allTests.length - 1;

  const handleNextClick = async () => {
    if (isTestCompeted && isLastTest) {
      setShowResult(true);
      return;
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < allTests.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowResult(true);
      const result = evaluateTests(allTests, userAnswers);
      dispatch(setIsTestCompleted(true));
      dispatch(setUserTestResult(result.results));
      dispatch(setUserCorrectAnswersCounter(result.correctCount));

      if (userInfo?.role === USER_ROLE.Student) {
        const testingResult = {
          ...result,
          username: `${userInfo?.name} ${userInfo?.surname}`,
          userEmail: userInfo?.email,
          correctCount: String(result.correctCount),
        };

        await axios.post(
          "http://localhost:8081/api/tests/addTestingResult",
          testingResult
        );
      }
      console.log("test", result);
    }
  };

  function evaluateTests(tests: any[], userAnswers: any) {
    let correctCount = 0;
    const results: Record<string, boolean> = {};

    tests.forEach((test, index) => {
      const isCorrect = checkTest(test, userAnswers[index]);
      results[index] = isCorrect ? true : false;
      if (isCorrect) {
        correctCount += 1;
      }
    });

    return {
      correctCount,
      results,
    };
  }

  function checkTest(test: any, userAnswer: any): boolean {
    switch (test.type) {
      case "1":
        return checkSingleChoiceTest(test.data, userAnswer);
      case "2":
        return checkMultipleChoiceTest(test.data, userAnswer);
      case "3":
        return checkTrueFalseTest(test.data, userAnswer);
      case "4":
        return checkFillInTheBlankTest(test.data, userAnswer);
      case "5":
        return checkOrderingTest(test.data, userAnswer);
      case "6":
        return checkMatchingTest(test.data, userAnswer);
      default:
        return false;
    }
  }

  function checkSingleChoiceTest(testData: any, userAnswer: any): boolean {
    if (!userAnswer) {
      return false;
    }
    const correct_answer = testData.correct_answer;
    return (
      userAnswer ===
      testData.options
        // @ts-ignore
        .find((_, index) => index === correct_answer)
        .toString()
    );
  }

  function checkMultipleChoiceTest(testData: any, userAnswer: any): boolean {
    if (!userAnswer) {
      return false;
    }
    return (
      JSON.stringify(userAnswer) === JSON.stringify(testData.correct_answers)
    );
  }

  function checkTrueFalseTest(testData: any, userAnswer: any): boolean {
    return userAnswer === testData.correct_answer.toString();
  }

  function checkFillInTheBlankTest(testData: any, userAnswer: string): boolean {
    if (!userAnswer) {
      return false;
    }
    return userAnswer.toLowerCase() === testData.missing_word.toLowerCase();
  }

  function checkOrderingTest(testData: any, userAnswer: any): boolean {
    if (!userAnswer) {
      return false;
    }
    // @ts-ignore
    const resultArray = testData.question_order.map((order, index) => ({
      order,
      text: testData.question_text[index],
    }));

    return JSON.stringify(userAnswer) === JSON.stringify(resultArray);
  }

  function checkMatchingTest(testData: any, userAnswer: any): boolean {
    if (!userAnswer) {
      return false;
    }
    const correctMatching = testData.matching;
    return JSON.stringify(userAnswer) === JSON.stringify(correctMatching);
  }

  const handleShowTestsAfterComplete = () => {
    setCurrentQuestionIndex(0);
    setShowResult(false);
  };

  const currentQuestion: SingleQuestion = allTests[currentQuestionIndex];

  return (
    <div className={styles.quizContainer}>
      {userInfo?.role === UserRole.Teacher && (
        <Link to="/statistic" className={styles.statisticButton}>
          Перейти до статистики
        </Link>
      )}
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
            Вы вірно надали відповідь на {score} из {allTests.length} питань.
          </p>
        </div>
      )}
      <div className={styles.buttonContainer}>
        {!showResult && (
          <button
            onClick={handlePreviousClick}
            disabled={currentQuestionIndex === 0}
          >
            Попереднє питання
          </button>
        )}
        {!showResult && (
          <button
            onClick={handleNextClick}
            disabled={showResult}
            className={isLastTest ? styles.yellowButton : ""}
          >
            {isLastTest
              ? isTestCompeted
                ? "Перейти до результату"
                : "Завершити тестування"
              : "Наступне питання"}
          </button>
        )}
        {showResult && (
          <button
            onClick={handleShowTestsAfterComplete}
            className={styles.yellowButton}
            style={{ margin: "0 auto" }}
          >
            {"Переглянути тести"}
          </button>
        )}
      </div>
      <div className={styles.buttonContainer}>
        {userInfo?.role === UserRole.Teacher && (
          <button onClick={() => undefined} className={styles.updateButton}>
            {"Оновити тест"}
          </button>
        )}
        {userInfo?.role === UserRole.Teacher && (
          <button onClick={() => undefined} className={styles.deleteButton}>
            {"Видалити тест"}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizApp;
