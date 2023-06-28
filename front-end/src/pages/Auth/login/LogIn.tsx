import '../Auth.css';
import '../AuthButtons.css';
import {NavLink} from "react-router-dom";
import Button from "../../../components/Button";
import LogRegWithSocial from "../LogRegWithSocial";
import {useSignIn} from "react-auth-kit";
import {useState} from "react";
import {AuthApiResponse} from "../../../types/interfaces/AuthApiResponse";

const LogIn = () => {
    const [error, setError] = useState("");
    const signIn = useSignIn();

    //TODO: auth
    const onSubmit = async (values: any) => {
        console.log("Values: ", values);
        setError("");

        try {
            const response: Response = await fetch("http://localhost:8080/api/v1/auth");
            const responseData: AuthApiResponse = await response.json();

            signIn({
                token: responseData.token,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: { email: values.email },
            });

        } catch (err) {
            console.log("Error: ", err);
        }
    };


    return (
        <div className="login-container">
           <LogRegWithSocial/>
            <div className="right-auth-container">
                <div className="auth-form title-form">
                    <p className='title-medium bottom-padding-mid'>Login</p>
                    <p className="text-normal">Don`t have an account? <NavLink className="link" to="/register">Create
                        Your Account</NavLink> it takes less than minute</p>
                </div>

                <div className="auth-form inputs-form">
                    <input placeholder="Username"/>
                    <p hidden></p>
                    <input placeholder="Password"/>
                    <p hidden></p>
                </div>
                <div className="auth-form button-form">
                    <Button class="btn btn-sizing btn-big" text="Submit" onClick={() => {}}/>
                    <NavLink className="link" to="/password-recovery">Forget your password?</NavLink>
                </div>
            </div>
        </div>
    );
};

export default LogIn;