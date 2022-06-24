import { call, put, all, takeLatest } from "redux-saga/effects";
import {
  checkUserSession,
  googleSignInStart,
  signInFailed,
  signInSuccess,
  emailSignInStart,
  emailSignUpStart,
  signUpSuccess,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
  signOutStart,
} from "./user.reducer";
import {
  createUserDocumentFromAuth,
  getCurrentUser,
  signInWithGooglePopup,
  SignInWithExistingUser,
  CreateAuthUserUsingEmailAndPassword,
  SignOutUser,
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
    console.log(userAuth);
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

////////////C. signup with email and password
export function* signUpWithEmail({ payload }) {
  try {
    const { displayName, email, password } = payload;
    //a. CreateAuthUserUsingEmailAndPassword will only create acc with email and password but doesnot include displayname
    //it will only create authentication but does not save our acc on database
    const { user } = yield call(
      CreateAuthUserUsingEmailAndPassword,
      email,
      password
    );
    console.log(user);
    if (!user) return;

    yield put(signUpSuccess({ user, displayName }));
  } catch (error) {
    console.log(error);
    yield put(signUpFailed(error));
  }
}

////////////D. when signup is successed
export function* signInAfterSignUp({ payload }) {
  const { displayName } = payload;
  const user = payload.user;
  // console.log(displayName,user)
  // getSnapshotFromUserAuth will verify the user and saves to store as current user
  yield call(getSnapshotFromUserAuth, user, { displayName });
}

//////E. for siginingout the user
export function* signOut() {
  try {
    yield call(SignOutUser); //call firebase signout method

    //if success then call signOutSuccess reducer method
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

////////this function are for running a function when dispatched////////////////////

//1. when the checkUserSession is dispatched the run isUserAuthenticated
export function* onCheckUserSession() {
  yield takeLatest(checkUserSession, isUserAuthenticated);
}

//for google signin i will mark steps with a,b,c
// 2. when googleSignInStart is dispatched then call signInWithGoogle
export function* onGoogleSignInstart() {
  yield takeLatest(googleSignInStart, signInWithGoogle);
}

//for signIn with email and password i will mark steps with capital A,B,C
//3. this is will run when emailSignInStart is dispatched
export function* onEmailSignInStart() {
  yield takeLatest(emailSignInStart, signInWithEmail);
}

//4. this function will run when emailSignUpStart is dispatched
export function* onEmailSignUpStart() {
  yield takeLatest(emailSignUpStart, signUpWithEmail);
}

// 5. this function will run when signUpSuccess is dispatched
export function* onSignUpSuccess() {
  yield takeLatest(signUpSuccess, signInAfterSignUp);
}

//6. this function will run when signOutStart is dispatched
export function* onSignOutStart() {
  yield takeLatest(signOutStart, signOut);
}

//these are the wathchers
//4. export the function which runs all the function
export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInstart),
    call(onEmailSignInStart),
    call(onEmailSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
