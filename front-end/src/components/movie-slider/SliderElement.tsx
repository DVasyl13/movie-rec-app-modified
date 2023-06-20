import {Link, NavLink} from "react-router-dom";

const SliderElement = (props: { src: string; }) => {
    return (
        <NavLink className='slider-element' to='/main'>
            <img src="https://via.placeholder.com/210/00FF00?text=1"></img>
            <p>Some</p>
        </NavLink>
    );
};

export default SliderElement;