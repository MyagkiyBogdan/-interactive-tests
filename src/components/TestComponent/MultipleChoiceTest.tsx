import React from "react";
import { MultipleChoiceQuestion } from "types/questionsDataTypes";
import styles from "./TestComponents.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserAnswers,
  selectUserAnswers,
  selectIsTestCompleted,
} from "redux/testsSlice";

type MultipleChoiceTestProps = {
  question: MultipleChoiceQuestion;
  currentQuestionIndex: number;
};

const MultipleChoiceTest: React.FC<MultipleChoiceTestProps> = ({
  question: {
    data: { question, options, correct_answers },
  },
  currentQuestionIndex,
}) => {
  const dispatch = useDispatch();
  const userAnswers = useSelector(selectUserAnswers);
  const selectedAnswers =
    userAnswers[currentQuestionIndex] || new Array(options.length).fill(false);
  const isTestCompleted = useSelector(selectIsTestCompleted);

  const updateUserAnswers = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[answerIndex] = !newSelectedAnswers[answerIndex];
    dispatch(
      setUserAnswers({
        testIndex: currentQuestionIndex,
        userAnswer: newSelectedAnswers,
      })
    );
  };

  return (
    <div className={styles.questionContainer}>
      {isTestCompleted && <p>Правильні варіанти обведени червоним</p>}
      <p>{question}:</p>
      <div className={styles.answerContainer}>
        {options.map((answer, index) => (
          <div key={index} className={styles.answerItem}>
            <label>
              <input
                type="checkbox"
                checked={selectedAnswers[index]}
                onChange={
                  isTestCompleted
                    ? () => undefined
                    : () => updateUserAnswers(index)
                }
              />
              <span
                style={{
                  border:
                    isTestCompleted && correct_answers[index]
                      ? "2px solid red"
                      : "none",
                  padding: "2px",
                  borderRadius: "4px",
                  marginRight: "4px",
                }}
              >
                {answer}
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceTest;
