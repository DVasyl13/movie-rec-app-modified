import '../DContent.css';
import Slider from "../../../components/movie-slider/Slider";
import MovieButtons from "./components/MovieButtons";
import MovieHeader from "./components/MovieHeader";
import {useEffect, useState} from "react";
import {ISliderElement} from "../../../types/interfaces/SliderElement";
import {IMovie} from "../../../types/interfaces/Movie";

const Movie = () => {
    const [similarMovies, setSimilarMovies] = useState<ISliderElement[]>([]);
    const [cast, setCast] = useState<ISliderElement[]>([]);
    const [movie, setMovie] = useState<IMovie>();
    async function getMovieDetails() {
        const href = document.location.href;
        const movieIMDbId = href.substring(href.lastIndexOf('/') + 1);
        try {
            const response = await fetch('http://localhost:8080/api/vi/movie/' + movieIMDbId);
            const responseBody: IMovie = await response.json();

            setMovie(responseBody);

            setSimilarMovies(responseBody.similarMovies);
            setCast(responseBody.cast);
        } catch (e) {
            console.log("Error: " + e);
        }
    }

    useEffect(() => {
        getMovieDetails();
    }, []);

    return (
        <>
            <div className="movie-page-container">
                <div className="container-content">
                    <div className="left-container">
                        <div className="left-container-content">
                            <img src={movie?.poster} id="movie-poster"/>
                            <MovieButtons/>
                        </div>
                    </div>
                    <div className="right-container">
                        <div className="right-container-top">
                            <div className="right-container-top-content">
                                <MovieHeader title={movie ? movie.title : 'Title'}
                                             imdbRating={movie? movie.imdbRating : 0.0}
                                             imdbRatingVoting={movie? movie.imdbRatingVoting : 0}
                                             metacriticRating={movie? movie.metacriticRating : 0}
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
                <Slider title="Similar" sliderElements={similarMovies}/>
                <Slider title="Cast" sliderElements={cast}/>
            </div>
        </>
    );
};

export default Movie;