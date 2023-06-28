import React from 'react';

interface MovieHeaderProps {
    title: string,
    imdbRating: number,
    imdbRatingVoting: number,
    metacriticRating: number
}

const MovieHeader = (props: MovieHeaderProps) => {
    return (
        <>
            <div className="movie-title">
                <p className="title-medium">{props.title}</p>
            </div>
            <div className="addition-content">
                <div id="imdb-rating" className="addition-content-element">
                    <img className="rating-icon"
                         src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"/>
                    <p className="rating-rate">{props.imdbRating}</p>
                    <p className="rating-votes">({props.imdbRatingVoting})</p>
                </div>
                <div id="metacritic-rating" className="addition-content-element">
                    <img className="rating-icon"
                         src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Metacritic_logo.svg/2560px-Metacritic_logo.svg.png"/>
                    <p className="rating-rate">{props.metacriticRating}</p>
                </div>
            </div>
        </>
    );
};

export default MovieHeader;