import React, { useEffect, useState } from "react";
import { SequencingQuestion } from "types/questionsDataTypes";
import { Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsTestCompleted,
  selectUserAnswers,
  setUserAnswers,
} from "redux/testsSlice";

type SequencingTestProps = {
  question: SequencingQuestion;
  currentQuestionIndex: number;
};

const SequencingTest: React.FC<SequencingTestProps> = ({
  question: {
    data: { question_order, question_text },
  },
  currentQuestionIndex,
}) => {
  const dispatch = useDispatch();
  const initialUserAnswer = question_order.map((order, index) => ({
    order,
    text: question_text[index],
  }));

  const [userAnswer, setUserAnswer] = useState(initialUserAnswer);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const userAnswersData = useSelector(selectUserAnswers);
  const isTestCompleted = useSelector(selectIsTestCompleted);

  useEffect(() => {
    if (userAnswersData[currentQuestionIndex]) {
      setUserAnswer(userAnswersData[currentQuestionIndex]);
      return;
    }
    shuffle();
  }, []);

  const updateAndSaveUserAnswer = () => {
    const updatedOrder = userAnswer.map((item) => {
      return { order: item.order, text: item.text };
    });
    dispatch(
      setUserAnswers({
        testIndex: currentQuestionIndex,
        userAnswer: updatedOrder,
      })
    );
  };

  const shuffle = () => {
    const shuffled = [...userAnswer];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setUserAnswer(shuffled);
  };

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
      {isTestCompleted && <p>Правильна послідовність</p>}
      {isTestCompleted &&
        question_text.map((element, index) => (
          <p key={index}>{`${index + 1}: ${element}`}</p>
        ))}
      {userAnswer.map((item, index) => (
        <Box
          key={item.order}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          border="1px solid #ddd"
          padding="10px"
          marginBottom="10px"
          borderRadius="8px"
          draggable
          onDragStart={
            isTestCompleted ? () => undefined : (e) => handleDragStart(e, index)
          }
          onDrop={
            isTestCompleted ? () => undefined : (e) => handleDrop(e, index)
          }
          onDragOver={isTestCompleted ? () => undefined : handleDragOver}
          style={{
            backgroundColor: draggedIndex === index ? "#2ecc71" : "inherit",
          }}
        >
          <span>{item.text}</span>
          <span>{index + 1}</span>
        </Box>
      ))}
      <Button
        variant="contained"
        onClick={shuffle}
        color="primary"
        sx={{ marginBottom: "10px" }}
      >
        Перемешать
      </Button>
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

export default SequencingTest;
