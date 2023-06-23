
interface ButtonProps {
    class: string,
    text: string
}

const Button = (props: ButtonProps) => {
    return (
        <button className={props.class}>
            {props.text}
        </button>
    );
};

export default Button;