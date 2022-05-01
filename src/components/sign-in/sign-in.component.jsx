import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";
import { useEffect } from "react";
import { auth } from "../../utils/firebase/firebase.utils";
import { getRedirectResult } from "firebase/auth";

const SignIn = () => {
  // creating user on database using google popup
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
    await createUserDocumentFromAuth(response.user);
  };

  // creating user on database using googleRedirect
  useEffect(() => {
    async function fetchData() {
      const response = await getRedirectResult(auth);

      if (response) {
        await createUserDocumentFromAuth(response.user);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Sign in</h1>
      <button onClick={logGoogleUser}>sign in with google popup</button>
      <button onClick={signInWithGoogleRedirect}>
        sign in with google redirect
      </button>
    </div>
  );
};

export default SignIn;
