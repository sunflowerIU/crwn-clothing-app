import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react"; //fragment can be use if we dont want to wrap out component with div
import "./navigation.styles.scss";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

const Navigation = () => {
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
          <Link className="nav-link" to="/auth">
            sign in
          </Link>
        </div>
      </div>
      <Outlet />{" "}
      {/*outlet ley chai k garxa vani, nested route to sabai component lai yo vitra rakhxa*/}
    </Fragment>
  );
};

export default Navigation;
