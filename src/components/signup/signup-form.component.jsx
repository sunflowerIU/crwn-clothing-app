import { useState, useContext } from "react";
import {
  CreateAuthUserUsingEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import InputForm from "../input-form/input-form.component";
import './signup-form.styles.scss'
import Button from "../button/button.component";
import { UserContext } from "../../contexts/user.context";

//1st. specify default form fields that we need
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

const SignUpForm = () => {

  //using context for setting current user afer succssfully signup
  const {setCurrentUser} = useContext(UserContext)

  //2nd. then use useState to formfield with defaultFormField we created.
  const [formFields, setFormFields] = useState(defaultFormFields);

  //5th after the values are being set to formFields, then extract the values from that form field
  const { displayName, email, password, passwordConfirm } = formFields;

  // 4th. when the input value is changed then import name and value form input and change form field to save it to formFields.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  //clear all input fields
  function clearInputFields() {
    setFormFields(defaultFormFields);
  }

  // submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) return alert("password do not match");

    try {
      const response = await CreateAuthUserUsingEmailAndPassword(
        email,
        password
      );
      setCurrentUser(response.user)  //set currentUser after signUp
      //   console.log(response);

      //now create user with that data
      if (!response.user) return;
      const createResponse = await createUserDocumentFromAuth(response.user, {
        displayName: displayName,
      });
      

      //if user created successfully then clear input fields
      if (createResponse) {
        clearInputFields();
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use, please choose another one.");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Signup with your email and password</span>
      <form onSubmit={submitHandler}>
        <InputForm
          label="Display Name"         
            type= "text"
            required
            name= "displayName"
            onChange= { handleChange }
           value={displayName}         
        />

        <InputForm
          label="Email"   
            type= "email"
            required
            name= "email"
            onChange= { handleChange }
            value={email}
        />

        <InputForm
          label="Password"
            type= "password"
            required
            name= "password"
            onChange= { handleChange }
            value={password}
        />

        <InputForm
          label="Password Confirm"
            type= "password"
            required
            name= "passwordConfirm"
            onChange= { handleChange }
            value={passwordConfirm}
        />

        <Button type='submit'>Sign up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;