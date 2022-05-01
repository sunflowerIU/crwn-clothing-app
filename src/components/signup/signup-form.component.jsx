import { useState } from "react";
import {
  CreateAuthUserUsingEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

//1st. specify default form fields that we need
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

const SignUpForm = () => {
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
    <div>
      <h1>Signup with your email and password</h1>
      <form onSubmit={submitHandler}>
        <label>Display Name</label>
        <input
          type="text"
          required
          name="displayName"
          onChange={handleChange} //3rd when there is change on input then goto handler
          value={displayName} //6th. then use that form values and put it here
        />

        <label>Email</label>
        <input
          type="email"
          required
          name="email"
          onChange={handleChange}
          value={email}
        />

        <label>Password</label>
        <input
          type="password"
          required
          name="password"
          onChange={handleChange}
          value={password}
        />

        <label>Password Confirm</label>
        <input
          type="password"
          required
          name="passwordConfirm"
          onChange={handleChange}
          value={passwordConfirm}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;
