
import React, { useState } from 'react';
import './UpgradePlan.css'
import Form from "../../components/Form/Form";
import {applyLtdCode} from "../../api/ltdCode";
import useAlert from "../../hooks/useAlert";
import Alert from "../../components/global/SuccessfulAlert/SuccesfullAlert";
import {useUser} from "../../context/UserContext";
import {Link} from "react-router-dom";
const plans = [
    {
        name: "Starter Plan",
        link:"starter",
        price: 1,
        credits: "10 Credits",
        checksPerMinute: "5 Checks Per Minute",
        features: [
            "Advanced Algorithm Analysis",
            "Comprehensive Explanations (200-300 words)",
            "Multi-Source Verification",
            "Clear Ratings & Severity Assessment",
            "Continuous Learning",
            "Secure Authentication",
            "Priority Support"
        ]
    },
    {
        name: "Pro Plan",
        price: 8,
        credits: "100 Credits",
        link:"pro",
        checksPerMinute: "5 Checks Per Minute",
        features: [
            "Advanced Algorithm Analysis",
            "Comprehensive Explanations (200-300 words)",
            "Multi-Source Verification",
            "Clear Ratings & Severity Assessment",
            "Continuous Learning",
            "Secure Authentication",
            "Priority Support"
        ]
    },
    {
        name: "Business Plan",
        link:"business",
        price: 15,
        credits: "500 Credits",
        checksPerMinute: "5 Checks Per Minute",
        features: [
            "Advanced Algorithm Analysis",
            "Comprehensive Explanations (200-300 words)",
            "Multi-Source Verification",
            "Clear Ratings & Severity Assessment",
            "Continuous Learning",
            "Secure Authentication",
            "Priority Support"
        ]
    }
];
const UpgradePlan = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isApplying,setIsApplying]=useState(false)
    const [error,setError]=useState("")
    const { show, mainText, text, triggerAlert, onClose } = useAlert();
    const {setUser,user} =useUser()
    const onSubmitPopup = async (data) => {
        console.log('Popup Form Data:', data);
        setIsApplying(true)
        const res= await applyLtdCode(data.code)
        if (res.message==="Code redeemed"){
            setIsPopupOpen(false);
            setError("")
            setUser({...user,credits:user.credits+50})
            triggerAlert("LTD code was successfully applied!","You will get 50 credits every month");
        }
        if (res.code){
            setError(res.response.data.message)
        }
        console.log('res:',res);
        setIsApplying(false)
    };

    // Close popup when overlay is clicked
    const handleOverlayClick = () => {
        setIsPopupOpen(false);
        setError("")
    };

    // Prevent the popup form from closing when clicked inside
    const handlePopupClick = (event) => {
        event.stopPropagation();
        setError("")
    };

    // Define the input fields configuration for the popup form
    const popupFields = [
        {
            name: 'code',
            label: 'Enter Your LTD Coupon Code',
            type: 'text',
            validation: {
                required: 'LTD is required',
            },
        },
    ];
        const [isCheckBoxChecked,setIsCheckboxChecked]=useState(false);

    return (
        <main className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <Alert show={show} mainText={mainText} text={text} onClose={onClose}/>
            {/* Header */}
            <p>Your current plain is:{user.subscription}</p>
            <p>Plan Type:{user.subscriptionType || "month"}</p>
            <div className="w-full max-w-4xl flex justify-between items-center mb-8">
                <h2 className="text-3xl font-semibold text-[#FFA500]">Upgrade Your Plan</h2>
                <div>
                    <button
                        type="button"
                        onClick={() => setIsPopupOpen(true)}
                        className="bg-[#FFA500] px-4 py-2
                      text-white rounded hover:bg-[#e59400] transition-colors"
                    >
                        LTD
                    </button>
                </div>
            </div>

            {/* Toggle Switch */}
            <div className="toggle-container">
                <span className="toggle-label">Monthly</span>
                <label className="toggle-switch">
                    <input checked={isCheckBoxChecked}
                           onChange={() => setIsCheckboxChecked(prevState => !prevState)}
                           type="checkbox" id="toggleButton"/>
                    <span className="slider"></span>
                </label>
                <span className="toggle-label">Yearly</span>
            </div>

            {/* Upgrade Plans Container */}
            <div className="upgrade-container w-full max-w-4xl bg-[#2C3E50] p-6 rounded-lg">
                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Starter Plan */}
                    {plans.map((plan, index) => (
                        <Link to={`/upgrade/pay/${plan.link}?type=${isCheckBoxChecked ? "year" : "month"}`}>
                            <div key={index} className="plan border border-white rounded-lg p-6 flex flex-col">
                                <h3 className="text-2xl font-semibold text-[#FFA500] mb-4">{plan.name}</h3>
                                <div
                                    className="option-price text-3xl font-bold text-white mb-4">${plan.price}{isCheckBoxChecked ? 0 : ""}</div>
                                <ul className="text-white mb-6 flex-grow">
                                    <li className="mb-2">{plan.credits}</li>
                                    <li className="mb-2">{plan.checksPerMinute}</li>
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="mb-2">{feature}</li>
                                    ))}
                                </ul>
                                <button
                                    className="mt-auto bg-[#FFA500] text-white py-2 rounded hover:bg-[#e59400] transition-colors">
                                    Subscribe Now
                                </button>
                            </div>
                        </Link>
                    ))}

                    {/* Enterprise Plan */}
                    <div className="col-span-1 md:col-span-3 plan border border-white rounded-lg p-6 flex flex-col">
                        <h3 className="text-2xl font-semibold text-[#FFA500] mb-4">Enterprise Plan</h3>
                        <p className="text-white mb-6 flex-grow">
                            Contact us for pricing and custom features tailored to your organization.
                        </p>
                        <button
                            className="mt-auto bg-[#FFA500] text-white py-2 rounded hover:bg-[#e59400] transition-colors">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </div>

            {/* Popup Modal */}
            {isPopupOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-200"
                        onClick={handleOverlayClick} // Close popup on clicking overlay
                        aria-labelledby="popup-title"
                        role="dialog"
                        aria-modal="true"
                    ></div>

                    {/* Modal Content */}
                    <div
                        className="fixed inset-0 flex justify-center items-center z-500"
                        onClick={handleOverlayClick} // Close popup on clicking overlay
                    >
                        <div
                            className="bg-[#2C3E50] p-8 rounded-lg w-full max-w-sm shadow-lg relative"
                            onClick={handlePopupClick} // Prevent closing on clicking inside the popup
                        >
                            <Form isLoading={isApplying} globalError={error} fields={popupFields}
                                  title={"Apply ltd Code"} onSubmit={onSubmitPopup} submitButtonText={"Apply Code"}/>
                        </div>
                    </div>
                </>
            )}
        </main>
    );

};

export default UpgradePlan;
