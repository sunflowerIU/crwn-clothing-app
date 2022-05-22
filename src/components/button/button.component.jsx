import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "./button.styles";

export const BUTTON_TYPE_CLASS = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

//create a function gives takes buutton type and return a button name which we have imported
const getButton = (buttonType = "base") => {
  return (
    //return a button name form a map according to the button type that has been shown
    {
      //creating a map. when creating a map we need to put key inside a array, otherwise there will be error
      [BUTTON_TYPE_CLASS.base]: BaseButton,
      [BUTTON_TYPE_CLASS.google]: GoogleSignInButton,
      [BUTTON_TYPE_CLASS.inverted]: InvertedButton,
    }[buttonType]
  );
};

const Button = ({ children, buttonType, ...otherProps }) => {
  //first find the button that  we need and set it as a customized button
  const CustomizedButton = getButton(buttonType);
  return <CustomizedButton {...otherProps}>{children}</CustomizedButton>;
};

export default Button;
