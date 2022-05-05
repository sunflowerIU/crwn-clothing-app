import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./components/authentication/authentication.component";

const Shop = () => {
  return (
    <div>
      <h1>Hello i am Shop</h1>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />{" "}
        {/*index rakhesi chai path set garnu pardaina, mathi ko route milesi y component rakha vanya ho tesle, index is true by default*/}
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
