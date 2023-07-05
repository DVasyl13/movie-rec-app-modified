import {useContext} from "react";
import {UserContext} from "../../storage/UserContext";
import {NavLink} from "react-router-dom";

const UserButton = () => {
    const { username } = useContext(UserContext);

    return (
        <>
            {username ? (
                <NavLink id="log-btn" className="log-btn" to="/account">
                    {username}
                </NavLink>
            ) : (
                <NavLink id="log-btn" className="log-btn" to="/login">
                    Login
                </NavLink>
            )}
        </>
    );
};

export default UserButton;