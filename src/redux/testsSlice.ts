import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SingleQuestion } from "types/questionsDataTypes";

interface BooleanObject {
  [key: string]: boolean;
}

interface TestsState {
  allTests: SingleQuestion[];
  userAnswers: Record<number, any>;
  isTestCompleted: boolean;
  userTestResult: BooleanObject;
  userCorrectAnswersCounter: number;
}

const initialState: TestsState = {
  allTests: [],
  userAnswers: {},
  isTestCompleted: false,
  userTestResult: {},
  userCorrectAnswersCounter: 0,
};

const resetTestsStateAction = (state: TestsState) => {
  state.allTests = [];
  state.userAnswers = {};
  state.isTestCompleted = false;
  state.userTestResult = {};
  state.userCorrectAnswersCounter = 0;
};

const testsSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {
    setTestsData: (state, action) => {
      state.allTests = action.payload;
    },
    setUserAnswers: (state, action) => {
      const { testIndex, userAnswer } = action.payload;
      state.userAnswers[testIndex] = userAnswer;
    },
    setIsTestCompleted: (state, action: PayloadAction<boolean>) => {
      state.isTestCompleted = action.payload;
    },
    setUserTestResult: (state, action: PayloadAction<Record<string, any>>) => {
      state.userTestResult = action.payload;
    },
    setUserCorrectAnswersCounter: (state, action: PayloadAction<number>) => {
      state.userCorrectAnswersCounter = action.payload;
    },
    resetTestsState: resetTestsStateAction,
  },
});

export const {
  setTestsData,
  setUserAnswers,
  setIsTestCompleted,
  setUserTestResult,
  setUserCorrectAnswersCounter,
  resetTestsState,
} = testsSlice.actions;

export const selectAllTests = (state: { tests: TestsState }) =>
  state.tests.allTests;
export const selectUserAnswers = (state: { tests: TestsState }) =>
  state.tests.userAnswers;
export const selectIsTestCompleted = (state: { tests: TestsState }) =>
  state.tests.isTestCompleted;
export const selectUserTestResult = (state: { tests: TestsState }) =>
  state.tests.userTestResult;
export const selectUserCorrectAnswersCounter = (state: { tests: TestsState }) =>
  state.tests.userCorrectAnswersCounter;

export default testsSlice.reducer;
