import SectionTitle from './../../../components/SectionTitle/SectionTitle';
import { loadStripe } from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)
const Payment = () => {
    return (
        <div>
            <SectionTitle heading="payment" subHeading='Please Pay to Eat'></SectionTitle>
            <Elements stripe={stripePromise}>
                <CheckoutForm></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;