import './Home.css';
import Slider from "../../components/movie-slider/Slider";
import {useEffect, useState} from "react";
import {ISliderElement} from "../../types/interfaces/SliderElement";

const Home = () => {
    const [popularMovies, setPopularMovies] = useState<ISliderElement[]>([]);
    const [topMovies, setTopMovies] = useState<ISliderElement[]>([]);
    const [usersFavouriteMovies, setUsersFavouriteMovies] = useState<ISliderElement[]>([]);


    async function getPopularMovies() {
        try {
            const response = await fetch('http://localhost:8080/api/vi/movie/popular');
            const responseBody:ISliderElement[] = await response.json();
            console.log(responseBody);
            setPopularMovies(responseBody);
        } catch (e) {
            console.error("Error: " + e);
        }

    }
    async function getTopIMDbMovies() {
        try {
            const response = await fetch('http://localhost:8080/api/vi/movie/top250');
            const responseBody:ISliderElement[] = await response.json();
            setTopMovies(responseBody);
        } catch (e) {
            console.error("Error: " + e);
        }
    }
    async function getUsersFavourite() {
        try {
            const response = await fetch('http://localhost:8080/api/vi/movie/favourite');
            const responseBody:ISliderElement[] = await response.json();
            setUsersFavouriteMovies(responseBody);
        } catch (e) {
            console.error("Error: " + e);
        }
    }

    useEffect(() => {
        getPopularMovies();
        getTopIMDbMovies();
        getUsersFavourite();

    }, []);

    return (
        <>
            <div className="movies-container">
                <Slider title="Popular Now" sliderElements={popularMovies}/>
                <Slider title="IMDb Top 250" sliderElements={topMovies}/>
                <Slider title="Users favourite" sliderElements={usersFavouriteMovies}/>
            </div>
        </>
    );
};

export default Home;