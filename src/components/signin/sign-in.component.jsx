import { useState, useContext } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  SignInWithExistingUser,
} from "../../utils/firebase/firebase.utils";

import InputForm from "../input-form/input-form.component";
import Button from "../button/button.component";
import "./sign-in.styles.scss";
import { UserContext } from "../../contexts/user.context";

const SignInForm = () => {

  //using UserContext for setting current user
  const { setCurrentUser } = useContext(UserContext);

  
  // creating user on database using google popup
  const signInWithGoogle = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
    await createUserDocumentFromAuth(response.user);
  };

  // 1. creating default input form field
  const defaultFormField = {
    email: "",
    password: "",
  };

  //usestate state for form
  const [formField, setFormfield] = useState(defaultFormField);

  //2 input change handler
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormfield({ ...formField, [name]: value });
  };

  //3 extract vaules from formField
  const { email, password } = formField;

  //4 clear input fields
  const clearInput = () => {
    setFormfield(defaultFormField);
  };

  //sign in handler with help of email and password after submit
  const handleSubmit = async (e) => {
    console.log(email, password);
    e.preventDefault();

    //now lets signin
    try {
      const response = await SignInWithExistingUser(email, password);
      setCurrentUser(response.user)
      if (response) {
        clearInput();
      }
    } catch (error) {
      if (error.message === "Firebase: Error (auth/user-not-found).") {
        alert("User not found");
      }
      if (error.message === "Firebase: Error (auth/wrong-password).") {
        alert("Wrong Password");
      }
      console.log(error.message);
    }
  };

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>signin with your email and password</span>
      <form onSubmit={handleSubmit}>
        <InputForm
          label="email"
          type="email"
          name="email"
          value={email}
          required
          onChange={changeHandler}
        />
        <InputForm
          label="password"
          type="password"
          name="password"
          value={password}
          required
          onChange={changeHandler}
        />
        <div className="buttons-container">
          <Button type="submit">sign in</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType="google">
            google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
