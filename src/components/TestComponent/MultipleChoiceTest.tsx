import React, { useState } from "react";
import { MultipleChoiceQuestion } from "types/questionsDataTypes";
import styles from "./TestComponents.module.css";
import { useDispatch } from "react-redux";
import { setUserAnswers } from "redux/testsSlice";

type MultipleChoiceTestProps = {
  question: MultipleChoiceQuestion;
  currentQuestionIndex: number;
};

const MultipleChoiceTest: React.FC<MultipleChoiceTestProps> = ({
  question: {
    data: { question, options },
  },
  currentQuestionIndex,
}) => {
  const dispatch = useDispatch();
  const [selectedAnswers, setSelectedAnswers] = useState<boolean[]>(
    new Array(options.length).fill(false)
  );

  const updateUserAnswers = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[answerIndex] = !newSelectedAnswers[answerIndex];
    setSelectedAnswers(newSelectedAnswers);
    dispatch(
      setUserAnswers({
        testIndex: currentQuestionIndex,
        userAnswer: newSelectedAnswers,
      })
    );
  };

  return (
    <div className={styles.questionContainer}>
      <p>{question}:</p>
      <div className={styles.answerContainer}>
        {options.map((answer, index) => (
          <div key={index} className={styles.answerItem}>
            <label>
              <input
                type="checkbox"
                checked={selectedAnswers[index]}
                onChange={() => updateUserAnswers(index)}
              />
              {answer}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceTest;
