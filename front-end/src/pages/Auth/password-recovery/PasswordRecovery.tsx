import React, {useState} from 'react';
import LogRegWithSocial from "../LogRegWithSocial";
import {NavLink, useNavigate} from "react-router-dom";
import IntermediateMessage from "./IntermediateMessage";
import PasswordRecoveryForm from "./PasswordRecoveryForm";
import NewPasswordForm from "./NewPasswordForm";

const PasswordRecovery: React.FC = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [verified, setVerified] = useState(false);
    const navigator = useNavigate();

    const handleEmailSubmit = async (email: string) => {
        setStep(2);
        const value = {
            "email": email
        }
        const response : Response = await fetch("http://localhost:8080/api/v1/auth/password-recovery",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        });
        const responseBody = await response.json();
        setVerified(true);
        setEmail(email);
        setStep(3);
    };

    const handlePasswordSubmit = async (password: string) => {
        const value = {
            "password": password
        }
        const response : Response = await fetch("http://localhost:8080/api/v1/auth/password-recovery",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        });
        const responseBody = await response.json();
        //send email about successful password changing
        navigator("/login");
    };

    return (
        <div className="login-container">
            <LogRegWithSocial />
            <div className="right-auth-container">
                <div className="auth-form title-form">
                    <p className='title-medium bottom-padding-mid'>Password Recovery</p>
                    {step === 1 && (
                        <>
                            <p className="text-normal">Don't have an account? <NavLink className="link" to="/register">Create Your Account</NavLink> it takes less than a minute</p>
                            <PasswordRecoveryForm onSubmit={handleEmailSubmit} />
                        </>
                    )}
                    {step === 2 && (
                        <IntermediateMessage />
                    )}
                    {step === 3 && verified && (
                        <>
                            <p className='title-medium bottom-padding-mid'>New Password</p>
                            <NewPasswordForm onSubmit={handlePasswordSubmit} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PasswordRecovery;