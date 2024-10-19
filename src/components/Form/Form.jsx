// src/components/ReusableForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import {Link} from "react-router-dom";

const ReusableForm = ({ title, fields, onSubmit,
                          globalError,isLoading,
                          submitButtonText = 'Submit',additionalLinks=[],resetForm }) => {
    const { register, handleSubmit
        , formState: { errors }, reset } = useForm();

    const handleFormSubmit = async (data) => {
       await onSubmit(data)
        if (resetForm){
            reset()
        }
        // Optionally reset the form after submission
    };
    console.log('f:',isLoading);
    return (
        <div className="flex  justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="bg-white dark:bg-gray-800 rounded-card shadow-card p-8 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-primary dark:text-primary mb-6 text-center">{title}</h2>

                {fields?.map((field, index) => (
                    <div className="mb-6" key={index}>
                        <label htmlFor={field.name} className="block text-gray-700 dark:text-gray-200 mb-2">
                            {field.label}
                        </label>
                        <input
                            disabled={field.disabled}
                            type={field.type}
                            id={field.name}
                            placeholder={field.placeholder}
                            aria-label={field.label}
                            {...register(field.name, field.validation)}
                            className={`w-full px-4 py-2 border ${
                               !field.disabled && ( errors[field.name] || globalError)   ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            } rounded focus:outline-none focus:ring-2
                            ${
                             !field.disabled && (   errors[field.name] || globalError)   ?
                                    'focus:ring-' : 'focus:ring-primary'
                            }
                              dark:bg-gray-700 dark:text-white`}
                        />
                        {errors[field.name] && (
                            <p className="text-red-500 text-sm mt-1">{errors[field.name].message}</p>
                        )}
                    </div>
                ))}

                <button
                    type="submit"
                    aria-label={submitButtonText}
                    disabled={isLoading}
                    className={` w-full bg-primary
                     dark:bg-primary text-white
                      py-2 mb-2 rounded hover:bg-secondary dark:hover:bg-secondary transition-colors 
                      duration-300 font-semibold`}
                >
                    {isLoading ? "Submitting...":submitButtonText}
                </button>
                {globalError ? <p className={"text-[red]"}>{globalError}</p>:""}
                {additionalLinks.map(el=><div className={"text-primary text-center hover:text-secondary mb-[5px]"}>
                    <Link to={el.href} >{el.text}</Link>
                </div>)}
            </form>
        </div>
    );
};

export default ReusableForm;
