import {NavLink} from "react-router-dom";
import SearchBar from "./SearchBar";
import './Header.css';

const Header = () => {
    return (
        <div className='header'>
            <div className='nav' id="header-navigation">
                <NavLink className='nav-element' to='/main'>Home</NavLink>
                <NavLink className='nav-element' to='/for-you'>For-you</NavLink>
                <NavLink className='nav-element' to='/saved'>Saved</NavLink>
                <SearchBar/>
                <NavLink id="log-btn" className='log-btn' to='/account'>Login</NavLink>
            </div>
        </div>
    );
};

export default Header;