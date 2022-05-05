import './authentication.styles.scss'
import SignUpForm from "../signup/signup-form.component";
import SignInForm from "../signin/sign-in.component";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
 