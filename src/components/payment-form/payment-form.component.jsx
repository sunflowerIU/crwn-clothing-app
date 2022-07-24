import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { BUTTON_TYPE_CLASS } from "../button/button.component";
import { PaymentFormContainer, FormContainer,PaymentButton } from "./payment-form.styles";
import { useState } from "react";
import { useSelector } from "react-redux";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const amount = useSelector((state) => state.cart.totalAmount);
  const user = useSelector((state) => state.user.currentUser);

  //create a state for is payment processing or not, set dalse as default
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  //to handle payment
  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    //set true so that we can load spinnner
    setIsProcessingPayment(true);

    //1. first call our serverless function using post method so that we can add body elements(like amount names etc)
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ amount }),
    }).then((res) => res.json());

    //2. after calling the function stipe gives us a secret key, which we will use it to proceed further payments
    const clientSecret = response.paymentIntent.client_secret;

    //3. using that secret key  of client we will confirm payment with their card
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement), //we have cardElement created in form, and getElement will directly get card details from there
        billing_details: user ? user.displayName : "Guest",
      },
    });

    //after payment succeed of fails remove the spinner
    setIsProcessingPayment(false);

    //4. if payment is failed then alert with error message
    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      //if payment is succeeded then alert with payment success  message
      if (paymentResult.paymentIntent.status === "succeeded") {
        console.log(paymentResult);
        alert("payment successful");
      }
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <PaymentButton
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPE_CLASS.inverted}
        >
          Pay now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
