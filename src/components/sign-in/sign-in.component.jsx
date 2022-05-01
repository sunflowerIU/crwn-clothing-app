import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../signup/signup-form.component";




const SignIn = () => {
  // creating user on database using google popup
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
    await createUserDocumentFromAuth(response.user);
  };

  return (
    <div>
      <h1>Sign in</h1>
      <button onClick={logGoogleUser}>sign in with google popup</button>
      <SignUpForm/>
    </div>
  );
};

export default SignIn;
