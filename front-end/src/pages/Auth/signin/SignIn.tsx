import '../Auth.css';
import {NavLink} from "react-router-dom";
import Button from "../../../components/Button";
import LogRegWithSocial from "../LogRegWithSocial";

const SignIn = () => {
    return (
        <div className="login-container">
            <LogRegWithSocial/>
            <div className="right-auth-container">
                <div className="auth-form title-form">
                    <p className='title-medium bottom-padding-mid'>Registration</p>
                </div>

                <div className="auth-form inputs-form">
                    <input placeholder="Username"/>
                    <input placeholder="Email"/>
                    <p hidden></p>
                    <input placeholder="Password"/>
                    <input placeholder="Password confirmation"/>
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

export default SignIn;