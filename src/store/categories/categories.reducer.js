import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  categories: [],
  error: null,
};

//if you want to learn about  this things  goto codesandbox.io i have done many examples on it

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    fetchCategoriesStart: (state, action) => {
      state.loading = true;
    },
    fetchCategoriesSucceed: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    },
    fetchCategoriesFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default categoriesSlice.reducer;
export const { fetchCategoriesSucceed,fetchCategoriesStart ,fetchCategoriesFailed} = categoriesSlice.actions;
