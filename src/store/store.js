// import { compose, applyMiddleware } from "redux";
import {configureStore} from '@reduxjs/toolkit'
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

//middleware runs after we dispatch the action but runs before hitting the reducer, and it help to runs logger of the redux that contains all logs
// const middlewares = [logger]; //keep logger in middleware because we can also keep other middleware inside brackets


// //composed enhancers are function wehre we can keep more than one functions to run them as single fuctions
// const composedEnhancers = compose(applyMiddleware(...middlewares));

// createStore(reducer, [preloadedState], [enhancer]) //note any params in square brackets [] means they are optional
//it contains 3 params 1st is reducer, 2nd is any other optional default state, and 3rd is any third party enhancers like middleware etc..
export const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>{
       return  getDefaultMiddleware({
           serializableCheck:false
       }).concat(logger)
    }
})
