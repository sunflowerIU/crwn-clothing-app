import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoriesMap: {},
};

//if you want to learn about  this things  goto codesandbox.io i have done many examples on it

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategoriesMap: (state, action) => {
      state.categoriesMap = action.payload;
    },
  },
});

export default categoriesSlice.reducer;
export const {setCategoriesMap}  = categoriesSlice.actions