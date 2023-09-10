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
