import {NavLink} from "react-router-dom";
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-content">
                <div className="footer-nav">
                    <NavLink className="ref-element" to="/main">Movies</NavLink>
                    <NavLink className="ref-element" to="/for-you">For you</NavLink>
                    <NavLink className="ref-element" to="/saved">Saved</NavLink>
                </div>
                <p>©2023 What to Watch | All Rights Reserved | Created by Vasyl Druchok</p>
            </div>
        </div>
    );
};

export default Footer;