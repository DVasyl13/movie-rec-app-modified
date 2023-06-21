import SliderElement from "./SliderElement";
import './Slider.css';
import React from "react";
import {ISliderElement} from "../../types/interfaces/ISliderElement";


interface SliderTapeProps {
    sliderIndex: number,
    movies: ISliderElement[]
}

const SliderTape = (props: SliderTapeProps) => {

    return (
        <div className="slider" style={{transform: `translateX(calc(${props.sliderIndex} * -100%))`}}>
            {props.movies.map((movie, index) => (
                    <SliderElement key={index}
                                   src={movie.src}></SliderElement>
                )
            )}
        </div>
    );
};

export default SliderTape;