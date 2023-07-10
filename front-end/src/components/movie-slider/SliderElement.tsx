import {Link, NavLink} from "react-router-dom";

type SliderElementProps = {
    id: string
    src: string
    name: string
}

const SliderElement = (props: SliderElementProps) => {
    return (
        <NavLink className='slider-element' to={'/movie/' + props.id}>
            <img src={props.src}></img>
            <p>{props.name}</p>
        </NavLink>
    );
};

export default SliderElement;