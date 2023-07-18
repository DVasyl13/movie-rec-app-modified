import React, {ChangeEvent, FormEvent, useState} from 'react';
import Button from "../../../components/Button";

interface PasswordRecoveryFormProps {
    onSubmit: (email: string) => void;
}

const PasswordRecoveryForm: React.FC<PasswordRecoveryFormProps> = ({ onSubmit }) => {
    const [email, setEmail] = useState("");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(email);
    };

    return (
        <form className="auth-form inputs-form" onSubmit={handleSubmit}>
            <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleInputChange}
            />
            <div className="auth-form">
                <Button class="btn btn-sizing btn-big" text="Submit" onClick={() => {
                }}/>
            </div>
        </form>
    );
};

export default PasswordRecoveryForm;