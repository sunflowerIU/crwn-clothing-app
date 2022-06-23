import { call, put, all, takeLatest } from "redux-saga/effects";
import {
  checkUserSession,
  googleSignInStart,
  signInFailed,
  signInSuccess,
  emailSignInStart,
} from "./user.reducer";
import {
  createUserDocumentFromAuth,
  getCurrentUser,
  signInWithGooglePopup,
  SignInWithExistingUser,
} from "../../utils/firebase/firebase.utils";
////A....handling for google signin

//get the real user data. since this function is for checking wehther the user is authenticated or not in the database
//so we will use this function many times
export function* getSnapshotFromUserAuth(userAuth, additionalInfo) {
  try {
    //here createUserDocumentFromAuth is a function, and sagaMiddleware will treat it as a saga,and any other data passed inside call will
    //be treated as parameter
    const userSnapShot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalInfo
    );

    //since there will not be user id in userSnapShot.data(). so we need to get that id from userSnapShot and spread rest of the data
    // userSnapShot contains {id:ffdfrwr,and others things} whereas userSnapShot.user() contains {displayname:amit,and others}
    yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

//1. then check if user authenticated or not
//actually this is a function to take the existing logged in user and this function will take that user whether it is authenticated or not
export function* isUserAuthenticated() {
  try {
    //first get that user from getCurrentUser
    const userAuth = yield call(getCurrentUser);

    if (!userAuth) return;
    //if user exists then we need to verify the user in database
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(checkUserSession(null));
  }
}

//a. signin with a google popup
export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    console.log(user);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

///////////B..... handling signin with email

// B. sigin with email and password
export function* signInWithEmail({ payload }) {
  try {
    const { email, password } = payload;
    const { user } = yield call(SignInWithExistingUser, email, password);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    if (error.message === "Firebase: Error (auth/user-not-found).") {
      yield put(signInFailed("User not found"));
    }
    if (error.message === "Firebase: Error (auth/wrong-password).") {
      put(signInFailed("Wrong Password"));
    }
    console.log(error.message);
  }
}

////////this function are for running a function when dispatched
// when the checkUserSession is dispatched the run isUserAuthenticated
export function* onCheckUserSession() {
  yield takeLatest(checkUserSession, isUserAuthenticated);
}

//for google signin i will mark steps with a,b,c
// when googleSignInStart is dispatched then call signInWithGoogle
export function* onGoogleSignInstart() {
  yield takeLatest(googleSignInStart, signInWithGoogle);
}

//for signIn with email and password i will mark steps with capital A,B,C
//this is will when emailSignInStart is dispatched
export function* onEmailSignInStart() {
  yield takeLatest(emailSignInStart, signInWithEmail);
}

//these are the wathchers
// export the function which runs all the function
export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInstart),
    call(onEmailSignInStart),
  ]);
}
