import SliderElement from "./SliderElement";
import './Slider.css';
import React from "react";
import {ISliderElement} from "../../types/interfaces/SliderElement";


interface SliderTapeProps {
    sliderIndex: number,
    movies: ISliderElement[]
}

const SliderTape = (props: SliderTapeProps) => {

    return (
        <div className="slider" style={{transform: `translateX(calc(${props.sliderIndex} * -100%))`}}>
            {props.movies.map((movie, index) => (
                    <SliderElement key={index}
                                   src={movie.src}
                                   id={movie.id}
                                   name={movie.text}
                    ></SliderElement>
                )
            )}
        </div>
    );
};

export default SliderTape;