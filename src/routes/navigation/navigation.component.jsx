import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react"; //fragment can be use if we dont want to wrap out component with div
import "./navigation.styles.scss";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { SignOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
  //extract currentUser from context
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);



  return (
    <Fragment>
      <div className="navigation">
        <Link to="/" className="logo-container">
          <CrwnLogo />
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>

          {/* if there is currentUser then show signout in nav otherwise show signin */}
          {currentUser ? (
            <Link className="nav-link" onClick={SignOutUser} to='#'>
              Sign out
            </Link>
          ) : (
            <Link className="nav-link" to="/auth">
              sign in
            </Link>
          )}
        </div>
      </div>
      <Outlet />{" "}
      {/*outlet ley chai k garxa vani, nested route to sabai component lai yo vitra rakhxa*/}
    </Fragment>
  );
};

export default Navigation;
