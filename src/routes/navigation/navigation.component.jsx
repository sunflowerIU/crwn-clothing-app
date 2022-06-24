import { Outlet } from "react-router-dom";
import { Fragment } from "react"; //fragment can be use if we dont want to wrap out component with div
import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { CartIcon } from "../../components/cart-icon/cart-icon.component";
import { CartDropdown } from "../../components/cart-dropdown/cart-dropdown.component";
// import { SignOutUser } from "../../utils/firebase/firebase.utils";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signOutStart } from "../../store/user/user.reducer";

const Navigation = () => {
  //useSelector is a hook to get the value from our store
  const currentUser = useSelector((state) => state.user.currentUser);
  const dropdownActive = useSelector((state) => state.cart.dropdownActive);

  const dispatch = useDispatch();

  const SignOutUser = () => {
    dispatch(signOutStart());
  };

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo />
        </LogoContainer>

        <NavLinks>
          <NavLink to="/shop">Shop</NavLink>

          {/* if there is currentUser then show signout in nav otherwise show signin */}
          {currentUser ? (
            <NavLink onClick={SignOutUser} to="#">
              Sign out
            </NavLink>
          ) : (
            <NavLink to="/auth">sign in</NavLink>
          )}

          <CartIcon />
        </NavLinks>
        {/* only show the dropdown if the dropdownActive is true in context */}
        {dropdownActive && <CartDropdown />}
      </NavigationContainer>
      <Outlet />{" "}
      {/*outlet ley chai k garxa vani, nested route to sabai component lai yo vitra rakhxa*/}
    </Fragment>
  );
};

export default Navigation;
