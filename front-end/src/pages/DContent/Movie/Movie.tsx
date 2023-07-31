import '../DContent.css';
import Slider from "../../../components/movie-slider/Slider";
import MovieButtons from "./components/MovieButtons";
import MovieHeader from "./components/MovieHeader";
import {useEffect, useState} from "react";
import {ISliderElement} from "../../../types/interfaces/SliderElement";
import {IMovie} from "../../../types/interfaces/Movie";
import {UserRelationToMovie} from "../../../types/interfaces/UserRelationToMovie";

const Movie = () => {
    const [similarMovies, setSimilarMovies] = useState<ISliderElement[]>([]);
    const [cast, setCast] = useState<ISliderElement[]>([]);
    const [movie, setMovie] = useState<IMovie>();
    const [userRelation, setUserRelation] = useState<UserRelationToMovie>();

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

    async function getUserRelationToMovie() {
        if (!!sessionStorage.getItem('jwt')) {
            const href = window.location.href;
            const movieIMDbId = href.substring(href.lastIndexOf('/') + 1);
            try {
                const response = await fetch("http://localhost:8080/api/v1/user/movie/" + movieIMDbId, {
                    mode: 'cors',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                    }
                })
                const responseBody: UserRelationToMovie = await response.json();
                setUserRelation(responseBody);
            } catch (e) {
                console.log("Error: " + e);
            }
        }
    }

    useEffect(() => {
        getMovieDetails();
        getUserRelationToMovie();
    }, []);

    return (
        <>
            <div className="movie-page-container">
                <div className="container-content">
                    <div className="left-container">
                        <div className="left-container-content">
                            <img src={movie?.poster} id="movie-poster"/>
                            {movie && <MovieButtons movie={movie} user={userRelation}/>}
                        </div>
                    </div>
                    <div className="right-container">
                        <div className="right-container-top">
                            <div className="right-container-top-content">
                                {movie && <MovieHeader title={movie ? movie.title : 'Title'}
                                              imdbRating={movie ? movie.imdbRating : 0.0}
                                              imdbRatingVoting={movie ? movie.imdbRatingVoting : 0}
                                              metacriticRating={movie ? movie.metacriticRating : 0}
                                    />}
                            </div>
                        </div>
                        <div className="content-description">
                            {movie && <p>Duration: {movie.duration}</p>}
                            {movie && <p>Genres: {movie.genre}</p>}
                            {movie && <p>Studious: {movie.studio}</p>}
                            {movie && <p className="movie-plot">{movie.plot}</p>}
                        </div>
                    </div>
                    <div className="empty-div"></div>
                </div>
                {movie && <Slider title="Similar" sliderElements={similarMovies}/>}
                {movie && <Slider title="Cast" sliderElements={cast}/>}
            </div>
        </>
    );
};

export default Movie;