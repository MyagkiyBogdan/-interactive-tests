import React from "react";
import { SingleChoiceQuestion } from "types/questionsDataTypes";
import styles from "./TestComponents.module.css";

import { useDispatch, useSelector } from "react-redux";
import { setUserAnswers, selectUserAnswers } from "redux/testsSlice";

type SingleChoiceTestProps = {
  question: SingleChoiceQuestion;
  currentQuestionIndex: number;
};

const SingleChoiceTest: React.FC<SingleChoiceTestProps> = ({
  question: {
    data: { question, options },
  },
  currentQuestionIndex,
}) => {
  const dispatch = useDispatch();
  const userAnswers = useSelector(selectUserAnswers);

  const updateUserAnswer = (answer: any) => {
    dispatch(
      setUserAnswers({
        testIndex: currentQuestionIndex,
        userAnswer: answer,
      })
    );
  };

  return (
    <div className={styles.questionContainer}>
      <p>{question}:</p>
      <div className={styles.answerContainer}>
        {options.map((answer, index) => (
          <div key={index} className={styles.answerItem}>
            <button
              onClick={() => updateUserAnswer(answer)}
              style={{
                backgroundColor:
                  userAnswers[currentQuestionIndex] === answer
                    ? "#2ecc71"
                    : "#3498db",
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

export default SingleChoiceTest;
