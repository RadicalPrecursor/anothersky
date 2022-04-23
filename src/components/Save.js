import starService from '../services/stars';
import ButtonUI from '../ui/ButtonUI';
import { useRef, useState } from 'react';

function SaveInactive(props) {
    return (
        <ButtonUI onClick={props.clickHandler}>
            <h3>save for later</h3>
        </ButtonUI>
    )
}

function SaveActive(props) {
    return (
        <ButtonUI>
            <form onSubmit={props.saveStars}>
                <p>name your sky</p>
                <button onClick={props.nevermindHandler}>nevermind</button>
                <input type='text' required id='name' ref={props.skyNameRef} />
                <button type='submit'> save stars</button>
            </form>
        </ButtonUI>
    )
}

function Save(props) {
    const [active, setActive] = useState(false);
    const skyNameRef = useRef();

    function activateClickHandler (event) {
        event.preventDefault();
        setActive(true);
    }

    function nevermindHandler (event) {
        event.preventDefault();
        setActive(false);
    }

    const saveStars = (event) => {
        event.preventDefault();
        console.log('saving');
        const skyName = skyNameRef.current.value;
        let d = new Date()
        const starData = {
            "operation": "create",
            "id": d.getTime(),
            "skyName": skyName,
            "starData": JSON.stringify(props.stars)
        }
        starService
        .create(starData)
        .then(response => console.log(response))
        // I find it unnerving if it flips back too quickly
        setTimeout(() => {setActive(false)}, 500);
    }

    if (active===true) {
        return (<SaveActive stars={props.stars} saveStars={saveStars} skyNameRef={skyNameRef} nevermindHandler={nevermindHandler}/>)
    } else {
        return (<SaveInactive clickHandler={activateClickHandler}/>)
    }
}

export default Save;
