import "../DContent.css";
import Slider from "../../../components/movie-slider/Slider";

const Person = () => {
    return (
        <div className="movie-page-container">
            <div className="container-content">
                <div className="left-container">
                    <div className="left-container-content">
                        <img/>
                    </div>
                </div>
                <div className="right-container">
                    <div className="right-container-top">
                        <div className="right-container-top-content">
                            <div className="title-medium">
                                <p ></p>
                            </div>
                        </div>
                    </div>
                    <div className="movie-description">
                    </div>
                    <div>

                    </div>
                </div>
                <div className="empty-div"></div>
            </div>
            <Slider/>
        </div>
    );
};

export default Person;