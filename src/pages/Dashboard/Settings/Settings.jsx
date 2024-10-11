import React from 'react';
import Form from "../../../components/Form/Form";

const Settings = () => {
    const formFields = [
        {
            name: "emailAddress",
            label: "Email Address",
            placeholder: "Enter your email",
            type: "email",
            validation: { required: "Email Address is required" },
        },
        {
            name: "newPassword",
            label: "New Password",
            placeholder: "Enter new password",
            type: "password",
            validation: { required: "New Password is required" },
        },
        {
            name: "confirmPassword",
            label: "Confirm Password",
            placeholder: "Confirm your password",
            type: "password",
            validation: { required: "Confirm Password is required" },
        },
        {
            name: "perplexityApiKey",
            label: "Perplexity API Key",
            placeholder: "Enter Perplexity API Key",
            type: "text",
            validation: { required: "Perplexity API Key is required" },
        },
        {
            name: "mainPrompt",
            label: "Main Prompt for Perplexity API",
            placeholder: "Enter Prompt",
            type: "text",
            validation: { required: "Main Prompt is required" },
        },
    ];
    const onSubmit=(data)=>{
        console.log('dashBoard settings:',data)
    }
    return (
        <Form onSubmit={onSubmit}
              fields={formFields} submitButtonText={"update"}  title={"Settings"}/>
         );
};

export default Settings;