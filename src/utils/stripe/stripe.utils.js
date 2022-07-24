import { loadStripe } from "@stripe/stripe-js";


//now this will connect our app with our stripe acc
export const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)