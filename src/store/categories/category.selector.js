import { createSelector } from "reselect";
//reselect stores the value of computation and and whenever the same function is invoked with same values, then computation is not performed
// but the stored value will be sent by function without computation

//select a reducer. its like taking a value
const selectCategoryReducer = (state) => state.categories;

//then keep that reducer inside the createSelector and 2nd params is a function for same categoryReducer
export const categoriesSelector = createSelector(
  selectCategoryReducer,
  (categoryReducer) => {
    return categoryReducer.categories; //return categories map
  }
);

////then create selector with that map and perform some computation
export const selectCategoriesMap = createSelector(
  categoriesSelector,
  (categories) => {
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);

///to create selector for isLoading
export const selectIsLoading = createSelector(
  selectCategoryReducer,
  (categoryReducer) => {
    return categoryReducer.loading;
  }
);

// //reduce through the array of objects and return a object that contains objects of title:items
// export const categoryselector = (state)=>state.categories.categories.reduce((acc, category) => {
//     const { title, items } = category;
//     acc[title.toLowerCase()] = items;
//     return acc;
//   },{});
