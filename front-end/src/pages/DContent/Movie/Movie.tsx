import '../DContent.css';
import Slider from "../../../components/movie-slider/Slider";
import MovieButtons from "./components/MovieButtons";
import MovieHeader from "./components/MovieHeader";


const Movie = () => {


    return (
        <>
            <div className="movie-page-container">
                <div className="container-content">
                    <div className="left-container">
                        <div className="left-container-content">
                            <img src="https://m.media-amazon.com/images/I/71NPmBOdq7L.jpg" id="movie-poster"/>
                            <MovieButtons/>
                        </div>
                    </div>
                    <div className="right-container">
                        <div className="right-container-top">
                            <div className="right-container-top-content">
                                <MovieHeader title={"Bladerunner 2049. 2077"}
                                             imdbRating={8.8}
                                             imdbRatingVoting={200000}
                                             metacriticRating={74}
                                />
                            </div>
                        </div>
                        <div className="content-description">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad eius et iure magni
                                mollitia non, pariatur rem reprehenderit similique tempore voluptates! Culpa deleniti
                                enim et explicabo molestiae nihil velit!</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad eius et iure magni
                                mollitia non, pariatur rem reprehenderit similique tempore voluptates! Culpa deleniti
                                enim et explicabo molestiae nihil velit!</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad eius et iure magni
                                mollitia non, pariatur rem reprehenderit similique tempore voluptates! Culpa deleniti
                                enim et explicabo molestiae nihil velit!</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad eius et iure magni
                                mollitia non, pariatur rem reprehenderit similique tempore voluptates! Culpa deleniti
                                enim et explicabo molestiae nihil velit!</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad eius et iure magni
                                mollitia non, pariatur rem reprehenderit similique tempore voluptates! Culpa deleniti
                                enim et explicabo molestiae nihil velit!</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad eius et iure magni
                                mollitia non, pariatur rem reprehenderit similique tempore voluptates! Culpa deleniti
                                enim et explicabo molestiae nihil velit!</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad eius et iure magni
                                mollitia non, pariatur rem reprehenderit similique tempore voluptates! Culpa deleniti
                                enim et explicabo molestiae nihil velit!</p>
                            <p className="movie-plot">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad
                                eius et iure magni mollitia non, pariatur rem reprehenderit similique tempore
                                voluptates! Culpa deleniti enim et explicabo molestiae nihil velit! Lorem ipsum dolor
                                sit amet, consectetur adipisicing elit. Ab ad eius et iure magni mollitia non, pariatur
                                rem reprehenderit similique tempore voluptates! Culpa deleniti enim et explicabo
                                molestiae nihil velit!</p>
                        </div>
                    </div>
                    <div className="empty-div"></div>
                </div>
                <Slider/>
                <Slider/>
            </div>
        </>
    );
};

export default Movie;