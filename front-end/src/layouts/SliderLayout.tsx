import ButtonHandle from "../components/movie-slider/Button/ButtonHandle";
import Slider from "../components/movie-slider/Slider";
import {useState} from "react";

const SliderLayout = () => {
    const [sliderIndex, setSliderIndex] = useState(0);

    const handleClick = (increment: number) => {
        console.log(sliderIndex);
        setSliderIndex(prevIndex => prevIndex + increment);
    };


    return (
        <div className="container">
            <ButtonHandle onClick={() => handleClick(-1)}
                          class='handle left-handle'
                          direction='&#8249;'/>
            <Slider sliderIndex={sliderIndex} />
            <ButtonHandle onClick={() => handleClick(1)}
                          class='handle right-handle'
                          direction='&#8250;'/>
        </div>
    );
};

export default SliderLayout;