import './ButtonHandle.css';

type ButtonHandleProps = {
    class: string;
    direction: string;
    onClick: () => void;
};

const ButtonHandle = (props: ButtonHandleProps) => {
    return (
        <button className={props.class} onClick={props.onClick}>
            <div className="text">{props.direction}</div>
        </button>
    );
};


export default ButtonHandle;