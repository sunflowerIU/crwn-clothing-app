import { call, put, all, takeLatest } from "redux-saga/effects";
import { getCategoriesAndDocument } from "../../utils/firebase/firebase.utils";
import {
  fetchCategoriesFailed,
  fetchCategoriesSucceed,
  fetchCategoriesStart,
} from "./categories.reducer";

///creating generator function for saga
//1. function that will fetch the categories from api
export function* fetchCategoryAsync() {
  try {
    const categories = yield call(getCategoriesAndDocument);
    yield put(fetchCategoriesSucceed(categories));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

//2. when the fetchCategoriesStart function is dispatched from the store then just run fetchCategoryAsync function
export function* onFetchCategories() {
  yield takeLatest(fetchCategoriesStart, fetchCategoryAsync);
}

// 3. this is monitor, which will be runned as middleware in store code. and it will keep running in middleware and calling the function inside it
//  when it detects the fetchCategoriesStart in middleware then this function will run onFetchCategories
export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
