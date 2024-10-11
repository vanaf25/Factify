import React from 'react';
import Form from "../../components/Form/Form";

const SignIn = () => {
    const signInFields = [
        {
            name: "emailOrUsername",
            label: "Email or Username",
            placeholder: "Enter your email or username",
            type: "text",
            validation: { required: "Email or Username is required" },
        },
        {
            name: "password",
            label: "Password",
            placeholder: "Enter your password",
            type: "password",
            validation: { required: "Password is required" },
        },
    ];
    const onSubmit=(data)=>{
        console.log('data:',data);
    }
    return (
      <Form submitButtonText={"Sign In"} fields={signInFields}
            additionalLinks={[{href:"/signUp",text:"Create account"}]}
            title={"Login to HighlightFactCheck"} onSubmit={onSubmit}/>
    );
};

export default SignIn;