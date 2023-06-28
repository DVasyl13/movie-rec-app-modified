import React from "react";

interface ButtonProps {
    class: string,
    text: string,
    onClick: () => void;
    spanText?: string,
}

const Button = (props: ButtonProps) => {


    return (
        <button className={props.class} onClick={props.onClick}>
            {props.spanText ?
                <span className="material-symbols-outlined">{props.spanText}</span>
                : ""}
            {props.text}
        </button>
    );
};




export default Button;