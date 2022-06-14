//middleware runs after we dispatch the action but runs before hitting the reducer, and it help to runs logger of the redux that contains all logs
// const middlewares = [logger]; //keep logger in middleware because we can also keep other middleware inside brackets
//creating our own middleware. we need to use functional programming concepts where the function return another function and that returns another function
export const myMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
      return next(action);
    }
  
    console.log("type: ", action.type);
    console.log("payload: ", action.payload);
    console.log("currentState: ", store.getState());
  
    //next will take the action to the next middleware or to the reducers directly
    next(action);
  
    //after the action has been submitted to the reducers, then log the store state
    console.log("next state: ", store.getState());
  };