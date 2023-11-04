import { combineReducers } from "redux";
import userReducer from "./userSlice";
import testsReducer from "./testsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  tests: testsReducer,
});

export default rootReducer;
