import ButtonUI from "../ui/ButtonUI";
// import classes from "../ui/ButtonUI.module.css"
import { useState } from 'react';

function RecallInactive(props) {
    return (
        <ButtonUI onClick={props.clickHandler}>
            <h3>recall a memory</h3>
        </ButtonUI>
    )
}

function RecallActive(props) {
    return (
        <ButtonUI>
        <form onSubmit={props.submitHandler}>
        <p>search by name</p>
        <button onClick={props.nevermindHandler}>nevermind</button>
        <input type='text' required id='sky-name' ref={props.skyNameRef} />
        <button type="submit"> recall </button>
        </form>
        </ButtonUI>
    )
}

function Recall(props) {
    const [active, setActive] = useState(false);
    function activateClickHandler (event) {
        event.preventDefault();
        setActive(true);
    }

    function nevermindHandler (event) {
        event.preventDefault();
        setActive(false);
    }

    if (active==true) {
        return (
            <RecallActive
                submitHandler={props.submitHandler}
                skyNameRef={props.skyNameRef}
                nevermindHandler={nevermindHandler}/>
        )
    } else {
        return (
            <RecallInactive
                clickHandler={activateClickHandler} />
        )
    }
}

export default Recall;
