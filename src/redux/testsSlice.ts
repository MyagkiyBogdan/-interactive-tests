import { createSlice } from "@reduxjs/toolkit";

const testsSlice = createSlice({
  name: "tests",
  initialState: { testsData: null },
  reducers: {
    setTestsData: (state, action) => {
      state.testsData = action.payload;
    },
  },
});

export const { setTestsData } = testsSlice.actions;

export default testsSlice.reducer;
