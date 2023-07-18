import React, {ChangeEvent, FormEvent, useState} from 'react';
import Button from "../../../components/Button";

interface NewPasswordFormProps {
    onSubmit: (password: string) => void;
}

const NewPasswordForm: React.FC<NewPasswordFormProps> = ({ onSubmit }) => {
    const [password, setPassword] = useState("");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(password);
    };

    return (
        <form className="auth-form inputs-form" onSubmit={handleSubmit}>
            <input
                id="new-password"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={handleInputChange}
            />
            <div className="auth-form">
                <Button class="btn btn-sizing btn-big" text="Submit" onClick={() => {
                }}/>
            </div>
        </form>
    );
};

export default NewPasswordForm;