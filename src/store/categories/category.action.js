import { getCategoriesAndDocument } from "../../utils/firebase/firebase.utils";
import {
  fetchCategoriesFailed,
  fetchCategoriesSucceed,
  fetchCategoriesStart,
} from "./categories.reducer";


//redux thunk is already prebuilt in redux toolkit. when fetching the categories asynchronously from api, it might be succeed or failed
export const fetchCategoryAsync = async (dispatch) => {
    //first when fetching categories array from api then dispatch the action which will set loading to true in store
  dispatch(fetchCategoriesStart());
  try {
    const categories = await getCategoriesAndDocument();
    dispatch(fetchCategoriesSucceed(categories));//if succeed to fetch categories array from api then dispatch the action with categories array
  } catch (error) {
    dispatch(fetchCategoriesFailed(error.message)); //if failed to fetch categories array from api then dispatch the action with failed message
  }
};
