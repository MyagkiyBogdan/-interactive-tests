import React from "react";
import { TrueFalseQuestion } from "types/questionsDataTypes";
import styles from "./TestComponents.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserAnswers,
  selectUserAnswers,
  selectIsTestCompleted,
} from "redux/testsSlice";

type TrueFalseChoiceTestProps = {
  question: TrueFalseQuestion;
  currentQuestionIndex: number;
};

const TrueFalseChoiceTest: React.FC<TrueFalseChoiceTestProps> = ({
  question: {
    data: { question, correct_answer },
  },
  currentQuestionIndex,
}) => {
  const dispatch = useDispatch();
  const userAnswers = useSelector(selectUserAnswers);
  const selectedAnswer = userAnswers[currentQuestionIndex] || null;
  const isTestCompleted = useSelector(selectIsTestCompleted);

  const updateUserAnswer = (answer: string) => {
    dispatch(
      setUserAnswers({
        testIndex: currentQuestionIndex,
        userAnswer: answer,
      })
    );
  };

  return (
    <div className={styles.questionContainer}>
      {isTestCompleted && <p>Правильна відповідь обведена червоним</p>}
      <p>{question}:</p>
      <div className={styles.answerContainer}>
        {["true", "false"].map((answer, index) => (
          <div key={index} className={styles.answerItem}>
            <button
              onClick={
                isTestCompleted
                  ? () => undefined
                  : () => updateUserAnswer(answer)
              }
              style={{
                backgroundColor:
                  selectedAnswer === answer ? "#2ecc71" : "#3498db",
                border:
                  isTestCompleted && answer === String(correct_answer)
                    ? "3px solid #e74c3c"
                    : "none",
              }}
            >
              {answer}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrueFalseChoiceTest;
