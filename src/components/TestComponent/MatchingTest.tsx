import React, { useEffect, useState } from "react";
import { MatchingQuestion } from "types/questionsDataTypes";
import { Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsTestCompleted,
  selectUserAnswers,
  setUserAnswers,
} from "redux/testsSlice";

type MatchingTestProps = {
  question: MatchingQuestion;
  currentQuestionIndex: number;
};

const MatchingTest: React.FC<MatchingTestProps> = ({
  question: {
    data: { questions, answers, matching },
  },
  currentQuestionIndex,
}) => {
  const dispatch = useDispatch();
  const [userAnswer, setUserAnswer] = useState([...answers]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const userAnswersData = useSelector(selectUserAnswers);
  const isTestCompleted = useSelector(selectIsTestCompleted);

  const updateAndSaveUserAnswer = () => {
    const updatedMatching: Record<string, string> = {};
    questions.forEach((question, index) => {
      updatedMatching[question] = userAnswer[index];
    });
    dispatch(
      setUserAnswers({
        testIndex: currentQuestionIndex,
        userAnswer: updatedMatching,
      })
    );
  };

  useEffect(() => {
    if (userAnswersData[currentQuestionIndex]) {
      setUserAnswer(Object.values(userAnswersData[currentQuestionIndex]));
    }
  }, []);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.dataTransfer.setData("text/plain", index.toString());
    setDraggedIndex(index);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, newIndex: number) => {
    e.preventDefault();
    const oldIndex = Number(e.dataTransfer.getData("text/plain"));
    const updatedUserAnswer = [...userAnswer];
    const [draggedItem] = updatedUserAnswer.splice(oldIndex, 1);
    updatedUserAnswer.splice(newIndex, 0, draggedItem);
    setUserAnswer(updatedUserAnswer);
    setDraggedIndex(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="matching-columns">
        <div className="matching-column">
          <h4>
            Правильні питання та відповіді повинні відповідати один одному за
            порядком у списку
          </h4>
          {isTestCompleted && <p>Правильна відповідніть</p>}
          {isTestCompleted &&
            Object.values(matching).map((element, index) => (
              <p key={index}>{`Питання ${index + 1}: ---> ${element}`}</p>
            ))}
          <h3>Питання</h3>
          {userAnswer.map((question, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              border="1px solid #ddd"
              padding="10px"
              marginBottom="10px"
              borderRadius="8px"
            >
              <span>{questions[index]}</span>
            </Box>
          ))}
        </div>
        <div className="matching-column">
          <h3>Відповіді</h3>
          {userAnswer.map((answer, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              border="1px solid #ddd"
              padding="10px"
              marginBottom="10px"
              borderRadius="8px"
              draggable
              onDragStart={
                isTestCompleted
                  ? () => undefined
                  : (e) => handleDragStart(e, index)
              }
              onDrop={
                isTestCompleted ? () => undefined : (e) => handleDrop(e, index)
              }
              onDragOver={isTestCompleted ? () => undefined : handleDragOver}
              style={{
                backgroundColor: draggedIndex === index ? "#2ecc71" : "inherit",
              }}
            >
              <span>{answer}</span>
            </Box>
          ))}
        </div>
      </div>
      <Button
        variant="contained"
        onClick={updateAndSaveUserAnswer}
        color="primary"
      >
        Сохранить ответ
      </Button>
    </div>
  );
};

export default MatchingTest;
