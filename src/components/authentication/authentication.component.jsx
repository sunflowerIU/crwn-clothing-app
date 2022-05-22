import { AuthenticationContainer } from "./authentication.styles.jsx";
import SignUpForm from "../signup/signup-form.component";
import SignInForm from "../signin/sign-in.component";

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainer>
  );
};

export default Authentication;
