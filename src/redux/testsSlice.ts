import { createSlice } from "@reduxjs/toolkit";
import { SingleQuestion } from "types/questionsDataTypes";

interface TestsState {
  allTests: SingleQuestion[];
  userAnswers: Record<number, any>;
}

const initialState: TestsState = {
  allTests: [],
  userAnswers: {},
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
  },
});

export const { setTestsData, setUserAnswers } = testsSlice.actions;

export const selectAllTests = (state: { tests: TestsState }) =>
  state.tests.allTests;
export const selectUserAnswers = (state: { tests: TestsState }) =>
  state.tests.userAnswers;

export default testsSlice.reducer;
