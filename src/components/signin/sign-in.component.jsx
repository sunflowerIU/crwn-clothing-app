import { useState } from "react";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.reducer";
import { useDispatch } from "react-redux";
import InputForm from "../input-form/input-form.component";
import Button from "../button/button.component";
import { BUTTON_TYPE_CLASS } from "../button/button.component";
import { SigninContainer, ButtonContainer } from "./sign-in.styles";

const SignInForm = () => {
  const dispatch = useDispatch();
  // creating user on database using google popup
  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
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
    // console.log(email, password);
    e.preventDefault();
    const data = { email, password };
    //now lets signin
    dispatch(emailSignInStart(data));
    clearInput()
   
  };

  return (
    <SigninContainer>
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
        <ButtonContainer>
          <Button type="submit">sign in</Button>
          <Button
            type="button"
            onClick={signInWithGoogle}
            buttonType={BUTTON_TYPE_CLASS.google}
          >
            google sign in
          </Button>
        </ButtonContainer>
      </form>
    </SigninContainer>
  );
};

export default SignInForm;
