import Header from "../components/header/Header";
import {NavLink} from "react-router-dom";
import './Started.css';
import Footer from "../components/footer/Footer";


function Started() {
    return (
        <div>
            <Header/>
            <div className="bg-img">
                <div className="blur">
                </div>
            </div>

            <div className="content">
                <p>Do not know what to watch?</p>
                <NavLink to="/main">Lets find out!</NavLink>
            </div>
            <Footer/>
        </div>
    );
}

export default Started;
