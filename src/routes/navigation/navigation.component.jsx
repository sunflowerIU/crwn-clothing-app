import { Outlet } from "react-router-dom";
import { Fragment, useContext } from "react"; //fragment can be use if we dont want to wrap out component with div
import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { CartIcon } from "../../components/cart-icon/cart-icon.component";
import { CartDropdown } from "../../components/cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../contexts/user.context";
import { SignOutUser } from "../../utils/firebase/firebase.utils";
import { DropdownContext } from "../../contexts/cart.context";

const Navigation = () => {
  //extract currentUser from context
  const { currentUser } = useContext(UserContext);
  // console.log(currentUser);
  const { dropdownActive } = useContext(DropdownContext);

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
            <NavLink  onClick={SignOutUser} to="#">
              Sign out
            </NavLink>
          ) : (
            <NavLink  to="/auth">sign in</NavLink>
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
