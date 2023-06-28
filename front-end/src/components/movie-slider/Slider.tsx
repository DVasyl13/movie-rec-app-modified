import ButtonHandle from "./Button/ButtonHandle";
import SliderTape from "./SliderTape";
import {useState} from "react";
import {ISliderElement} from "../../types/interfaces/SliderElement";


const Slider = () => {
    const [sliderIndex, setSliderIndex] = useState(0);
    const [movies, setMovies] = useState<ISliderElement[]>(
        [
            {
                rel: '/main',
                src: 'https://via.placeholder.com/220/00FF00?text=1',
                text: 'title'
            },
            {
                rel: '/main',
                src: 'https://via.placeholder.com/220/00FF00?text=2',
                text: 'title'
            },
            {
                rel: '/main',
                src: 'https://via.placeholder.com/220/00FF00?text=3',
                text: 'title'
            },
            {
                rel: '/main',
                src: 'https://via.placeholder.com/220/00FF00?text=4',
                text: 'title'
            },
            {
                rel: '/main',
                src: 'https://via.placeholder.com/220/00FF00?text=5',
                text: 'title'
            },
            {
                rel: '/main',
                src: 'https://via.placeholder.com/220/00FF00?text=6',
                text: 'title'
            },
            {
                rel: '/main',
                src: 'https://via.placeholder.com/220/00FF00?text=7',
                text: 'title'
            },
            {
                rel: '/main',
                src: 'https://via.placeholder.com/220/00FF00?text=8',
                text: 'title'
            },
            {
                rel: '/main',
                src: 'https://via.placeholder.com/220/00FF00?text=9',
                text: 'title'
            },
            {
                rel: '/main',
                src: 'https://via.placeholder.com/220/00FF00?text=10',
                text: 'title'
            },
        ]
    );

    const handleClick = (increment: number) => {
        // Example:
        // map size / size of frame > sliderIndex + increment
        // 18 / 6 > 0 + 1 - from first to second
        // 18 / 6 > 1 + 1 - from second to third
        // 18 / 6 > 2 + 1 - false

        const itemsPerScreen: string = getComputedStyle(document.querySelector('.slider')!)
            .getPropertyValue('--items-per-screen');
        if (sliderIndex + increment < movies.length / parseInt(itemsPerScreen)
            && sliderIndex + increment >= 0) {
            setSliderIndex(prevIndex => prevIndex + increment);
        }
    };

    return (
        <div className="container">
            <div className="slider-header">
                <h3 className='title'>Something</h3>
            </div>
            <div className="slider-container">
                <ButtonHandle onClick={() => handleClick(-1)}
                              class='handle left-handle'
                              direction='&#8249;'/>
                <SliderTape movies={movies} sliderIndex={sliderIndex}/>
                <ButtonHandle onClick={() => handleClick(1)}
                              class='handle right-handle'
                              direction='&#8250;'/>
            </div>
        </div>
    );
};

export default Slider;