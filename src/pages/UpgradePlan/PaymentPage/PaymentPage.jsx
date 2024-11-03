import React, {useEffect, useState} from 'react';
import {
    PaymentElement,
    useStripe,
    useElements, CardElement,
} from '@stripe/react-stripe-js';
import {basicPayment} from "../../../api/stripe";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import useAlert from "../../../hooks/useAlert";
import {useUser} from "../../../context/UserContext";
import Alert from "../../../components/global/SuccessfulAlert/SuccesfullAlert";
const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { search } = useLocation(); // get the query string, e.g., "?type=ty"
    const queryParams = new URLSearchParams(search);

    // Extract specific query parameters
    const type = queryParams.get('type'); // e.g., "ty"
    const {id,}=useParams();
    const navigate=useNavigate();
    const {setUser,user} =useUser()
    useEffect(() => {
        if(id!=="pro" && id!=="business"  && id!=="starter"){
            navigate("/upgrade");
        }
        if(user.subscription===id && type===user.subscriptionType) navigate("/upgrade");
    }, [id]);
    const [errorMessage, setErrorMessage] = useState(null)
    const [isLoading,setIsLoading]=useState(false)
    const { show, mainText, text, triggerAlert, onClose } = useAlert();
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        console.log('elements:',elements);
        if (elements == null) {
            return;
        }
        const {error: submitError,...rest} = await elements.submit();
        console.log('rest:',rest);
        if (submitError) {
            // Show error to your customer
            setErrorMessage(submitError.message);
            return;
        }
        console.log('payment:',elements.getElement("payment"))
        const { paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements?.getElement(CardElement),
        });
        console.log('paymentMethod:',paymentMethod);
        const res = await basicPayment({plan:id,type:type,paymentMethod: paymentMethod.id,});
        const plans={
            starter:10,
            pro:100,
            business:150
        }
        console.log('payment:',res);
        const clientSecret=res?.latest_invoice?.payment_intent?.client_secret
        console.log('client secretL',clientSecret);
        if ( clientSecret){
            /*triggerAlert(`Plan was successfully activated!`,`You will get ${plans[id]} credits every month`);
            setUser({...user,subscription:id,credits:user.credits+plans[id]})
            navigate("/");*/
            const confirm = await stripe.confirmCardPayment(clientSecret);
            if (confirm.error){
                triggerAlert(`Something went wrong!`,"","error")
                setIsLoading(false)
            }
            else{
                triggerAlert(`Plan was successfully activated!`,`You will get ${plans[id]} credits every month`);
                setUser({...user,subscription:id,credits:user.credits+plans[id]})
                navigate("/")
            }
        }
    };

    return (
        <>
            <Alert show={show} mainText={mainText} text={text} onClose={onClose}/>
            <form onSubmit={handleSubmit} className={" w-[300px] sm:w-[500px] mx-auto"}>
                <CardElement/>
                <button type="submit"
                        className={"bg-primary mt-4  text-white py-2 text-[20px] transition duration-500 ease-in-out hover:bg-primary-dark w-full"}
                        disabled={!stripe || !elements || isLoading }>
                    {isLoading ? "Processing...":"Pay"}
                </button>
                {/* Show error message to your customers */}
                {errorMessage && <div>{errorMessage}</div>}
            </form>
        </>

    );
};
export default CheckoutForm