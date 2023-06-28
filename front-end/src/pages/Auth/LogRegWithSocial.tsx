import React from 'react';
import Button from "../../components/Button";

const LogRegWithSocial = () => {
    return (
        <div className="left-auth-container">
            <p className="title-login">What To Watch</p>
            <p className="text-normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nisi
                perspiciatis quae qui?
                Accusantium alias dolore eos, eum, explicabo illum ipsa iste mollitia nihil perferendis quidem quod
                sit soluta veritatis.</p>
            <div className="social">
                <p>Login with social media</p>
                <div className="social-btns">
                    <Button class="btn btn-sizing" text="Twitter" onClick={() => {}}/>
                    <Button class="btn btn-sizing" text="Google" onClick={() => {}}/>
                </div>
            </div>
        </div>
    );
};

export default LogRegWithSocial;