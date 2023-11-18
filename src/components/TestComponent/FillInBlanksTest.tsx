import React from "react";
import { FillInTheBlanksQuestion } from "types/questionsDataTypes";
import styles from "./TestComponents.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserAnswers,
  selectUserAnswers,
  selectIsTestCompleted,
} from "redux/testsSlice";
import TextField from "@mui/material/TextField";

type FillInTheBlanksTestProps = {
  question: FillInTheBlanksQuestion;
  currentQuestionIndex: number;
};

const FillInTheBlanksTest: React.FC<FillInTheBlanksTestProps> = ({
  question: {
    data: { question, missing_word },
  },
  currentQuestionIndex,
}) => {
  const dispatch = useDispatch();
  const userAnswers = useSelector(selectUserAnswers);
  const previousUserAnswer = userAnswers[currentQuestionIndex] || "";
  const isTestCompleted = useSelector(selectIsTestCompleted);

  const updateUserAnswer = (value: string) => {
    const newUserAnswer = value;
    dispatch(
      setUserAnswers({
        testIndex: currentQuestionIndex,
        userAnswer: newUserAnswer,
      })
    );
  };

  return (
    <div className={styles.questionContainer}>
      {isTestCompleted && <p>Правильна відповідь: {missing_word}</p>}
      <p>
        <TextField
          value={previousUserAnswer}
          onChange={
            isTestCompleted
              ? () => undefined
              : (e) => updateUserAnswer(e.target.value)
          }
          placeholder={"Пропущене слово"}
          variant="standard"
        />
        {" - "}
        {question}
      </p>
    </div>
  );
};

export default FillInTheBlanksTest;
