import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

//if you want to learn about  this things  goto codesandbox.io i have done many examples on it

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export default categoriesSlice.reducer;
export const {setCategories}  = categoriesSlice.actions