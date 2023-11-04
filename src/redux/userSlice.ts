import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserInfo } from "types/reduxTypes";

interface UserState {
  userInfo: UserInfo | null;
  loggedIn: boolean;
}

const initialState: UserState = {
  userInfo: null,
  loggedIn: false,
};

export const loginUser = createAsyncThunk<UserInfo, void>(
  "user/login",
  async (userData) => {
    const response = await axios.post(
      "http://localhost:8081/api/users/loginUser",
      userData
    );

    return response.data;
  }
);

export const logoutUser = createAsyncThunk<void, void>(
  "user/logout",
  async () => {
    console.log("user logged out");
  }
);

export const createUser = createAsyncThunk<UserInfo, any>(
  "user/createUser",
  async (userData) => {
    const response = await axios.post(
      "http://localhost:8081/api/users/createUser",
      userData
    );

    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.userInfo = action.payload;
        state.loggedIn = true;
      }
    });

    builder.addCase(createUser.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      state.loggedIn = true;
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.userInfo = null;
      state.loggedIn = false;
    });
  },
});

export const selectLoggedIn = (state: { user: UserState }) =>
  state.user.loggedIn;
export const selectUserInfo = (state: { user: UserState }) =>
  state.user.userInfo;
export const selectUserRole = (state: { user: UserState }) =>
  state.user.userInfo?.role;

export default userSlice.reducer;
