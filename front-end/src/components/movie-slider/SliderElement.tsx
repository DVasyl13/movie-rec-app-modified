import {Link, NavLink} from "react-router-dom";

type SliderElementProps = {
    src: string
}

const SliderElement = (props: SliderElementProps) => {
    return (
        <NavLink className='slider-element' to='/main'>
            <img src={props.src}></img>
            <p>Some</p>
        </NavLink>
    );
};

export default SliderElement;