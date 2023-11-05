export type QuestionsData = {
  questionText: string;
  answers: string[];
  correct: number;
}[];

export interface Question {
  questionText: string;
  answers: string[];
  correct: number;
}

export type SingleChoiceQuestion = {
  type: "1";
  data: {
    id: number;
    question: string;
    correct_answer: number;
    options: string[];
  };
};

export type MultipleChoiceQuestion = {
  type: "2";
  data: {
    id: number;
    question: string;
    correct_answers: boolean[];
    options: string[];
  };
};

export type TrueFalseQuestion = {
  type: "3";
  data: {
    id: number;
    question: string;
    correct_answer: boolean;
  };
};

export type FillInTheBlanksQuestion = {
  type: "4";
  data: {
    id: number;
    question: string;
    missing_word: string;
  };
};

export type SequencingQuestion = {
  type: "5";
  data: {
    id: number;
    question_order: number[];
    question_text: string[];
  };
};

export type MatchingQuestion = {
  type: "6";
  data: {
    id: number;
    questions: string[];
    answers: string[];
    matching: Record<string, string>;
  };
};

export type SingleQuestion =
  | SingleChoiceQuestion
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | FillInTheBlanksQuestion
  | SequencingQuestion
  | MatchingQuestion;
