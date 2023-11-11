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

// types/questionsDataTypes.ts

export type Option = string;
export type Options = Option[];

export interface MultipleChoiceTestData {
  id: number;
  question: string;
  correct_answer: number;
  options: Options;
}

export interface TrueFalseTestData {
  id: number;
  question: string;
  correct_answers: boolean[];
  options: Options;
}

export interface SingleChoiceTestData {
  id: number;
  question: string;
  correct_answer: number;
  options: Options;
}

export interface FillInTheBlankTestData {
  id: number;
  question: string;
  missing_word: string;
}

export interface OrderingTestData {
  id: number;
  question_order: { order: number; text: string }[];
  question_text: string[];
}

export interface MatchingTestData {
  id: number;
  questions: string[];
  answers: string[];
  matching: Record<string, string>;
}

export type TestData =
  | MultipleChoiceTestData
  | TrueFalseTestData
  | SingleChoiceTestData
  | FillInTheBlankTestData
  | OrderingTestData
  | MatchingTestData;

export interface Test {
  type: string;
  data: TestData;
}

export type Answer =
  | string
  | boolean
  | { order: number; text: string }[]
  | Record<string, string>;

export interface Question {
  [index: number]: Answer;
}
