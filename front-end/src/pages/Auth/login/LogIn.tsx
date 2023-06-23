import '../Auth.css';
import {NavLink} from "react-router-dom";
import Button from "../../../components/Button";
import LogRegWithSocial from "../LogRegWithSocial";

const LogIn = () => {
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
                    <Button class="btn btn-sizing btn-big" text="Submit"/>
                    <NavLink className="link" to="/password-recovery">Forget your password?</NavLink>
                </div>
            </div>
        </div>
    );
};

export default LogIn;