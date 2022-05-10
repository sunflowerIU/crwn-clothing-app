import "./button.styles.scss";

const BUTTON_TYPE_CLASS = {
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = ({ children, handler, buttonType, ...otherProps }) => {
  return (
    <button
      onClick={handler}
      className={`button-container ${BUTTON_TYPE_CLASS[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
