import "../DContent.css";
import Slider from "../../../components/movie-slider/Slider";
import {useEffect, useState} from "react";
import {ISliderElement} from "../../../types/interfaces/SliderElement";
import {Movie} from "../../../types/interfaces/Movie";
import {Person} from "../../../types/interfaces/Person";

const Person = () => {
    const [knownForMovies, setKnownForMovies] = useState<ISliderElement[]>([]);
    const [person, setPerson] = useState<Person>();
    async function getMovieDetails() {
        const href = location.href;
        const movieIMDbId = href.substring(href.lastIndexOf('/') + 1);
        try {
            const response = await fetch('http://localhost:8080/api/vi/person/' + movieIMDbId);
            const responseBody: Person = await response.json();

            setPerson(responseBody);
            setKnownForMovies(responseBody.knownForMovies);
        } catch (e) {
            console.log("Error: " + e);
        }
    }

    useEffect(() => {
        getMovieDetails();
    }, []);

    return (
        <div className="movie-page-container">
            <div className="container-content">
                <div className="left-container">
                    <div className="left-container-content">
                        <img src={person?.poster}/>
                    </div>
                </div>
                <div className="right-container">
                    <div className="right-container-top">
                        <div className="right-container-top-content">
                            <div className="title-medium">
                                <p></p>
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
            <Slider title="Known For" sliderElements={knownForMovies}/>
        </div>
    );
};

export default Person;