import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./components/authentication/authentication.component";
import { Shop } from "./components/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { useEffect } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "./utils/firebase/firebase.utils";
import { SET_CURRENT_USER as setCurrentUser } from "./store/user/user.reducer";
import { useDispatch } from "react-redux";

const App = () => {
  //usedispatch is a react-redux hook that will dispatch action same as reducer, dispatch will send the action to root reducer where it will send to all reducer
  //onAuthStateChangedListener will listen all the auth like signin and signout, and it gives a value called unsubscribe which willstop listening auth
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        //if there is user when new signup then save that user into database
        await createUserDocumentFromAuth(user);
      }

      //if user is not available like after signout then set currentuser to null, if existing user is available then set current user to that user
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />{" "}
        {/*index rakhesi chai path set garnu pardaina, mathi ko route milesi y component rakha vanya ho tesle, index is true by default*/}
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
