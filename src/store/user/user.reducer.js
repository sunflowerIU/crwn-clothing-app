import { createSlice } from "@reduxjs/toolkit";

//define a initial state for user
const initialState = {
  isLoading: false,
  currentUser: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    checkUserSession: (state) => {
      state.isLoading = false;
    },
    googleSignInStart: (state) => {
      state.isLoading = false;
    },
    emailSignInStart: (state) => {
      state.isLoading = false;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    signInFailed: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
export const {
  checkUserSession,
  googleSignInStart,
  emailSignInStart,
  signInSuccess,
  signInFailed,
} = userSlice.actions;
