import './Home.css';
import ButtonHandle from "../../components/movie-slider/Button/ButtonHandle";
import Slider from "../../components/movie-slider/Slider";

const Home = () => {

    return (
        <>
            <div className="movies-container">
                <div className="container">
                    <ButtonHandle class='handle left-handle'/>
                    <Slider/>
                    <ButtonHandle class='handle right-handle'/>
                </div>
            </div>
        </>
    );
};

export default Home;