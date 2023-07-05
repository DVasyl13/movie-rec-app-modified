import '../Auth.css';
import '../AuthButtons.css';
import JwtDecode from "jwt-decode";
import {NavLink, useNavigate} from "react-router-dom";
import Button from "../../../components/Button";
import LogRegWithSocial from "../LogRegWithSocial";
import {useSignIn} from "react-auth-kit";
import React, {useContext, useState} from "react";
import {AuthApiResponse} from "../../../types/interfaces/AuthApiResponse";
import {useFormik} from "formik";
import {LoginRequest} from "../../../types/interfaces/LoginRequest";
import {UserContext} from "../../../storage/UserContext";
import {Token} from "../../../types/interfaces/Token";

const LogIn = () => {
    const { username, setUsername } = useContext(UserContext);
    const [error, setError] = useState("");
    const signIn = useSignIn();
    const navigator = useNavigate();

    const onSubmit = async (values: LoginRequest) => {
        console.log("Values: ", values);
        setError("");

        try {
            const response: Response = await fetch("http://localhost:8080/api/v1/auth/authenticate", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            const responseData: AuthApiResponse = await response.json();
            const token: Token = JwtDecode(responseData.token);
            setUsername(token.nma);
            signIn({
                token: responseData.token,
                expiresIn: 3600 * 24,
                tokenType: "Bearer",
                authState: {email: values.email},
            });
            navigator('/account');
        } catch (err) {
            console.log("Error: ", err);
        }
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit,
    });


    return (
        <div className="login-container">
            <LogRegWithSocial/>
            <div className="right-auth-container">
                <div className="auth-form title-form">
                    <p className='title-medium bottom-padding-mid'>Login</p>
                    <p className="text-normal">Don`t have an account? <NavLink className="link" to="/register">Create
                        Your Account</NavLink> it takes less than minute</p>
                </div>

                <form className="auth-form inputs-form"
                      onSubmit={formik.handleSubmit}>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    <input
                        id="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        placeholder="Enter password"
                    />
                    <div className="auth-form">
                        <Button class="btn btn-sizing btn-big" text="Submit" onClick={() => {
                        }}/>
                    </div>
                    <NavLink className="link" to="/password-recovery">Forget your password?</NavLink>
                </form>
            </div>
        </div>
    );
};

export default LogIn;