import { QuestionsData } from "../types/questionsDataTypes";

export const questionsData: QuestionsData = [
  {
    questionText: "Что такое JavaScript?",
    answers: [
      "Язык программирования",
      "Язык разметки",
      "Браузер",
      "Браузер 1",
      "Браузер 2",
      "Браузер 3",
    ],
    correct: 0,
  },
  {
    questionText: "Как объявить переменную в JavaScript?",
    answers: ["let myVar;", "myVar = 10;", "variable myVar;", "Я не знаю"],
    correct: 0,
  },
  {
    questionText: "Что такое HTML?",
    answers: ["Язык программирования", "Язык разметки", "Браузер", "Я не знаю"],
    correct: 1,
  },
];
