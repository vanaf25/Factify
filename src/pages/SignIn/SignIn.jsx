import React from 'react';
import Form from "../../components/Form/Form";
import {login} from "../../api/auth";
import {useNavigate} from "react-router-dom";

const SignIn = () => {
    let navigate = useNavigate();
    const signInFields = [
        {
            name: "email",
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
    const onSubmit=async (data)=>{
        console.log('data:',data);
        const res=await login(data);
        if (res.token){
            localStorage.setItem("token",res.token);
            navigate("/");
        }
        console.log('res:',res);
    }
    return (
      <Form submitButtonText={"Sign In"} fields={signInFields}
            additionalLinks={[{href:"/signUp",text:"Create account"}]}
            title={"Login to HighlightFactCheck"} onSubmit={onSubmit}/>
    );
};

export default SignIn;