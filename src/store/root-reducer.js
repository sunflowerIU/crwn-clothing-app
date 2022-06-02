//root-reducer is a place where we will combine all our reducer in one place

import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import categoriesReducer from "./categories/categories.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
});
