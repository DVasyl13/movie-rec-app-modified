import React, {useState} from 'react';
import LogRegWithSocial from "../LogRegWithSocial";
import {NavLink} from "react-router-dom";
import IntermediateMessage from "./IntermediateMessage";
import PasswordRecoveryForm from "./PasswordRecoveryForm";
import NewPasswordForm from "./NewPasswordForm";

const PasswordRecovery: React.FC = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [verified, setVerified] = useState(false);

    const handleEmailSubmit = (email: string) => {
        // Add your email verification logic here
        // Once the email is successfully verified, set the 'verified' state to true
        setVerified(true);
        setEmail(email);
        setStep(2);
    };

    const handlePasswordSubmit = (password: string) => {
        // Add your password update logic here
        // Once the password is successfully updated, set the 'step' state to 3
        setStep(3);
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