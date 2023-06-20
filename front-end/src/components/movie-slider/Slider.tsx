import SliderElement from "./SliderElement";
import './Slider.css';
import React from "react";

type SliderProps = {
    sliderIndex: number;
};
const Slider = (props: SliderProps) => {

    return (
        <div className="slider" style={{ transform: `translateX(calc(${props.sliderIndex} * -100%))` }}>
            <SliderElement src='https://via.placeholder.com/220/00FF00?text=1'></SliderElement>
            <SliderElement src='https://via.placeholder.com/220/00FF00?text=2'></SliderElement>
            <SliderElement src='https://via.placeholder.com/220/00FF00?text=3'></SliderElement>
            <SliderElement src='https://via.placeholder.com/220/00FF00?text=4'></SliderElement>
            <SliderElement src='https://via.placeholder.com/220/00FF00?text=5'></SliderElement>
            <SliderElement src='https://via.placeholder.com/220/00FF00?text=6'></SliderElement>
            <SliderElement src='https://via.placeholder.com/220/00FF00?text=7'></SliderElement>
            <SliderElement src='https://via.placeholder.com/220/00FF00?text=8'></SliderElement>
            <SliderElement src='https://via.placeholder.com/220/00FF00?text=9'></SliderElement>
        </div>
    );
};

export default Slider;