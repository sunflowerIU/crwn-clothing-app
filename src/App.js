import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./components/authentication/authentication.component";
import { Shop } from "./components/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />{" "}
        {/*index rakhesi chai path set garnu pardaina, mathi ko route milesi y component rakha vanya ho tesle, index is true by default*/}
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path = 'checkout' element={<Checkout/>} />
      </Route>
    </Routes>
  );
};

export default App;
