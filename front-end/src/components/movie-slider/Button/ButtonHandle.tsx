import './ButtonHandle.css';
const ButtonHandle = (props:{class:string}) => {
    return (
        <button className={props.class}>
            <div className="text">&#8249;</div>
        </button>
    );
};

export default ButtonHandle;