import { createSlice } from "@reduxjs/toolkit";

//define a initial state for user
const initialState = {
  currentUser: null,
};

//creating a useReducer
//set default state value to initial state
// export const userReducer = (state = initialState, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case "SET_CURRENT_USER":
//       return {
//         currentUser: payload,
//       };

//     //this default switch will only be triggered when none of the cases above are true
//     //and it is very important to return state as default because it helps to know whether react need tp re render or not
//     //if the state passed on this reducer is same as state returned by this reducer than react will know nothing need to be re render
//     default:
//       return state;
//   }
// };
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_CURRENT_USER: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { SET_CURRENT_USER } = userSlice.actions;
