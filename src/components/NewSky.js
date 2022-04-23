import ButtonUI from "../ui/ButtonUI";

function NewSky(props) {
    return (
        <ButtonUI onClick={props.clickHandler} >
            <h3>look elsewhere</h3>
        </ButtonUI>
    )
}

export default NewSky
