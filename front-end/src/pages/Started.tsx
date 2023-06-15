import {NavLink} from "react-router-dom";
import './Started.css';


function Started() {
    return (
        <>
            <div className="bg-img">
                <div className="blur">
                </div>
            </div>

            <div className="content">
                <p>Do not know what to watch?</p>
                <NavLink to="/main">Lets find out!</NavLink>
            </div>
        </>
    );
}

export default Started;
