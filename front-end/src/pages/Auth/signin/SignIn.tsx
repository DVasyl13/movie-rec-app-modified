import '../Auth.css';
import '../AuthButtons.css';
import {NavLink, useNavigate} from "react-router-dom";

import Button from "../../../components/Button";
import LogRegWithSocial from "../LogRegWithSocial";
import {useFormik} from "formik";
import {RegistrationRequest} from "../../../types/interfaces/RegistrationRequest";
import {AuthApiResponse} from "../../../types/interfaces/AuthApiResponse";
import React, {useState} from "react";
import {useSignIn} from "react-auth-kit";

const SignIn = () => {
    const [error, setError] = useState("");
    const signIn = useSignIn();
    const [passConf, setPassConf] = useState("");
    const navigator = useNavigate();

    const onSubmit = async (values: RegistrationRequest) => {
        console.log("Values: ", values);
        setError("");
        if (passConf !== values.password) {
            alert("Passwords do not matches.")
            return;
        }
        try {
            const response: Response = await fetch("http://localhost:8080/api/v1/auth/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            const responseData: AuthApiResponse = await response.json();
            console.log(responseData);
            
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
            username: "",
            email: "",
            password: ""
        },
        onSubmit,
    });

    return (
        <div className="login-container">
            <LogRegWithSocial/>
            <div className="right-auth-container">
                <div className="auth-form title-form">
                    <p className='title-medium bottom-padding-mid'>Registration</p>
                    <p className="text-normal">Already have an account? <NavLink className="link" to="/login">Go to the
                        Login page</NavLink></p>
                </div>

                <form className="auth-form inputs-form"
                      onSubmit={formik.handleSubmit}>
                    <input
                        id="username"
                        type="text"
                        placeholder="Enter Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                    />
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
                    <input
                        id="confpassword"
                        type="password"
                        value={passConf}
                        onChange={e => setPassConf(e.target.value)}
                        placeholder="Password Confirmation"
                    />
                    <div className="auth-form">
                        <Button class="btn btn-sizing btn-big" text="Submit" onClick={() => {
                        }}/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;