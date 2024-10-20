import React, {useEffect, useState} from 'react';
import {verifyJwt} from "../../api/auth";
import {useNavigate} from "react-router-dom";
import {useUser} from "../../context/UserContext";

const PrivateRoute = ({children}) => {
    const { setUser,user } = useUser(); // Get setUser from context
    const navigate=useNavigate();
    useEffect(() => {
        const token=localStorage.getItem("token")
        const asyncFunc=async ()=>{
            if (token){
                try {
                    const data=await verifyJwt({jwt:token});
                    console.log('u:',data.user)
                    if (data.user) setUser(data.user)
                    else                     navigate("/signIn")
                }
                catch (e) {
                    navigate("/signIn")
                    setUser(null)
                }
            }
            else navigate("/signIn")
        }
        asyncFunc();
    }, []);
    return (
        <>
            {user ? children:""}
        </>
    );
};

export default PrivateRoute;