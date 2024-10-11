import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const UserForm = () => {
    // State to manage popup visibility
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // Main form handling
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset: resetMainForm,
    } = useForm();

    const onSubmit = (data) => {
        console.log('Main Form Data:', data);
        resetMainForm();
    };

    // Popup form handling
    const {
        register: registerPopup,
        handleSubmit: handleSubmitPopup,
        formState: { errors: popupErrors },
        reset: resetPopupForm,
    } = useForm();

    const onSubmitPopup = (data) => {
        console.log('Popup Form Data:', data);
        resetPopupForm();
        setIsPopupOpen(false); // Close popup after submission
    };

    // Close popup when overlay is clicked
    const handleOverlayClick = () => {
        setIsPopupOpen(false);
    };

    // Prevent the popup form from closing when clicked inside
    const handlePopupClick = (event) => {
        event.stopPropagation();
    };

    // Define the input fields configuration for the main form
    const fields = [
        {
            name: 'userName',
            label: 'Username',
            disabled:true,
            type: 'text',
            validation: { required: 'Username is required' },
        },
        {
            name: 'email',
            label: 'Email',
            disabled:true,
            type: 'email',
            validation: {
                required: 'Email is required',
                pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address',
                },
            },
        },
        {
            name: 'currentPassword',
            label: 'Current Password',
            type: 'password',
            validation: { required: 'Current password is required' },
        },
        {
            name: 'newPassword',
            label: 'New Password',
            type: 'password',
            validation: { required: 'New password is required' },
        },
    ];

    return (
        <div className="main-content   min-h-screen bg-gray-100">
            {/* Main Form */}
            <div className={"flex justify-between"}>
                <h2 className={"text-[#6C63FF]"}>Settings</h2>
                <div>
                    <button
                        type="button"
                        onClick={() => setIsPopupOpen(true)}
                        className="p-2 bg-[#D95D30] text-white rounded hover:bg-[#e0633a] transition-colors ml-4"
                    >
                        Add coupon code
                    </button>
                </div>
            </div>
            <div className={"flex justify-center"}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-[500px] bg-[#2C3E50] border border-gray-700 p-8 rounded-lg"
                >
                    <h2 className="text-2xl text-white mb-6 text-center">User Form</h2>

                    {/* Render input fields using map */}
                    {fields.map((field) => (
                        <div className="mb-4" key={field.name}>
                            <label className="block text-white mb-2" htmlFor={field.name}>
                                {field.label}
                            </label>
                            <input
                                disabled={field.disabled}
                                id={field.name}
                                type={field.type}
                                {...register(field.name, field.validation)}
                                className={`w-full p-2 text-black rounded  border ${
                                    errors[field.name] ? 'border-red-500' : 'border-gray-400'
                                }  text-gray-200 disabled:cursor-not-allowed
                                 disabled:bg-slate-50 disabled:text-slate-500
                                  disabled:border-slate-200 disabled:shadow-none `}
                                placeholder={`Enter your ${field.label.toLowerCase()}`}
                            />
                            {errors[field.name] && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors[field.name].message}
                                </p>
                            )}
                        </div>
                    ))}

                    {/* Buttons Container */}
                    <div className="flex justify-between items-center">
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className=" p-3 bg-[#D95D30] text-white rounded hover:bg-[#e0633a] transition-colors"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>

            {/* Popup Modal */}
            {isPopupOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                        onClick={handleOverlayClick} // Close popup on clicking overlay
                        aria-labelledby="popup-title"
                        role="dialog"
                        aria-modal="true"
                    ></div>

                    {/* Modal Content */}
                    <div
                        className="fixed inset-0 flex justify-center items-center z-50"
                        onClick={handleOverlayClick} // Close popup on clicking overlay
                    >
                        <div
                            className="bg-[#2C3E50] p-8 rounded-lg w-[400px] relative"
                            onClick={handlePopupClick} // Prevent closing on clicking inside the popup
                        >
                            <h3
                                id="popup-title"
                                className="text-xl text-white mb-4 text-center"
                            >
                                Popup Form
                            </h3>

                            {/* Popup Form */}
                            <form onSubmit={handleSubmitPopup(onSubmitPopup)}>
                                <div className="mb-4">
                                    <label className="block text-white mb-2" htmlFor="popupField">
                                        Popup Field
                                    </label>
                                    <input
                                        id="popupField"
                                        type="text"
                                        {...registerPopup('popupField', { required: 'This field is required' })}
                                        className={`w-full p-2 text-black rounded  border ${
                                            popupErrors.popupField ? 'border-red-500' : 'border-gray-400'
                                        }  text-gray-200`}
                                        placeholder="Enter popup information"
                                    />
                                    {popupErrors.popupField && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {popupErrors.popupField.message}
                                        </p>
                                    )}
                                </div>

                                {/* Buttons in Popup */}
                                <div className="flex justify-end space-x-4">
                                    {/* Close Button */}
                                    <button
                                        type="button"
                                        onClick={() => setIsPopupOpen(false)}
                                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                                    >
                                        Close
                                    </button>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-[#D95D30] text-white rounded hover:bg-[#e0633a] transition-colors"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserForm;
