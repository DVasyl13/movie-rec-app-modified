import './Home.css';
import Slider from "../../components/movie-slider/Slider";

const Home = () => {

    return (
        <>
            <div className="movies-container">
                <Slider/>
                <Slider/>
                <Slider/>
            </div>
        </>
    );
};

export default Home;