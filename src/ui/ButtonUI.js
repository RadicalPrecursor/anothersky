import classes from './ButtonUI.module.css';

function ButtonUI(props) {
    // function clickHandler(event) {
    //     console.log('clicked')
    // }
    return <div className={classes.buttonUI} onClick={props.onClick}>
        {props.children}
    </div>
}

export default ButtonUI;
