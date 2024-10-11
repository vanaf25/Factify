import React from 'react';
import Form from "../../components/Form/Form";

const SignUp = () => {
    const userFormFields = [
        {
            name: "username",
            label: "Username",
            placeholder: "Choose a username",
            type: "text",
            validation: { required: "Username is required" },
        },
        {
            name: "email",
            label: "Email",
            placeholder: "Enter your email",
            type: "email",
            validation: { required: "Email is required" },
        },
        {
            name: "password",
            label: "Password",
            placeholder: "Create a password",
            type: "password",
            validation: { required: "Password is required" },
        },
        {
            name: "confirmPassword",
            label: "Confirm Password",
            placeholder: "Confirm your password",
            type: "password",
            validation: { required: "Confirm Password is required" },
        },
    ];
    const onSubmit=(data)=>{
        console.log('data:',data);
    }
    return (
        <Form fields={userFormFields}
              onSubmit={onSubmit}
              submitButtonText={"Sign Up"}
              additionalLinks={[{href:"/signIn",text:"Already have an account? Login here"}]}
              title={"Sign Up for HighlightFactCheck"}/>
    );
};

export default SignUp;