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
      state.error = null
    },
    signInFailed: (state, action) => {
      state.error = action.payload;
    },
    emailSignUpStart: (state) => {
      state.isLoading = false;
    },
    signUpSuccess: (state, action) => {
      state.signUpSuccess = action.payload;
      state.error = null
    },
    signUpFailed: (state, action) => {
      state.error = action.payload;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.error = null
    },
    signOutFailed: (state, action) => {
      state.error = action.payload;
    },
    signOutStart: (state, action) => {
      state.isLoading = false;
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
  emailSignUpStart,
  signUpSuccess,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
  signOutStart,
} = userSlice.actions;
