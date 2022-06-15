// import { compose, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { myMiddleware } from "./middleware/myLoggerMiddleware"; //our custom middleware
//using redux persist. to persist store and reducer into local storage
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; //default location as localstorage of web

//1. create config file for persist
const persistConfig = {
  key: "root", //can be any string
  storage,
  blacklist: ["user"], //to not persist user reducer, but persist all other reducer
};

//2. create persisted reducer for persisting reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// createStore(reducer, [preloadedState], [enhancer]) //note any params in square brackets [] means they are optional
//it contains 3 params 1st is reducer, 2nd is any other optional default state, and 3rd is any third party enhancers like middleware etc..
export const store = configureStore({
  reducer: persistedReducer, //3. put that persisted reducer on the reducer.
  devTools: process.env.NODE_ENV !== "production", //it accepts boolean(default is true), this code says when we are not in production(i.e devtools) then only we can use redux devtools on browser using chrome extension
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(myMiddleware);
  },
});

//4. now persist the whole store and export it
export const persistor = persistStore(store);
