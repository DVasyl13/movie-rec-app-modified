import React, {useEffect, useState} from 'react';
import "./Account.css";
import Button from "../../components/Button";
import {useSignOut} from "react-auth-kit";
import {useNavigate} from "react-router-dom";


const Account = () => {
    const signOut = useSignOut();
    const navigator = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [country, setCountry] = useState("");
    const [birthday, setBirthday] = useState("");

    useEffect(() => {

    }, []);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setFunction: React.Dispatch<React.SetStateAction<string>>
    ) => {
        setFunction(event.target.value);
    };
    function logout() {
        signOut();
        sessionStorage.removeItem("jwt");
        sessionStorage.removeItem("name");
        navigator("/main");
    }

    const onSubmit = () => {
        console.log(username, password, email, country, birthday);
    }

    return (
        <>
            <div className="background-img">
                <div className="blur">
                </div>
            </div>

            <div className="main-container">
                <div className="user-fields">
                    <div className="field-container">
                        <label className="lb-input">Username</label>
                        <input className="user-input"
                               id="username"
                               type="text"
                               value={username}
                               onChange={(event) => handleInputChange(event, setUsername)}
                               placeholder="Username"/>
                    </div>
                    <div className="field-container">
                        <label className="lb-input">Email</label>
                        <input className="user-input"
                               id="email"
                               type="text"
                               value={email}
                               onChange={(event) => handleInputChange(event, setEmail)}
                               placeholder="Email"/>
                    </div>
                    <div className="field-container">
                        <label className="lb-input">Password</label>
                        <input className="user-input"
                               id="password"
                               type="password"
                               value={password}
                               onChange={(event) => handleInputChange(event, setPassword)}
                               placeholder="Password"/>
                    </div>
                    <div className="field-container">
                        <label className="lb-input">Country</label>
                        <input className="user-input"
                               id="country"
                               type="text"
                               value={country}
                               onChange={(event) => handleInputChange(event, setCountry)}
                               placeholder="Country"/>
                    </div>
                    <div className="field-container">
                        <label className="lb-input">Birthday</label>
                        <input className="user-input"
                               id="birthday"
                               type="date"
                               value={birthday}
                               onChange={(event) => handleInputChange(event, setBirthday)}
                               placeholder="Birthday"/>
                    </div>
                </div>
                <div className="button-container">
                    <Button class="btn" text="Change" onClick={onSubmit}/>
                    <Button class="btn" text="Log Out" onClick={logout}/>
                </div>
            </div>
        </>
    );
};

export default Account;