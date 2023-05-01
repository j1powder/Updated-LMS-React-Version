import classes from "./NewCard.module.css";

const NewCard = (props) => {
// use this approach if allowing outside styling onto this card -> const classes = 'card' + props.className';
    return <div className={classes.newcard}>
        {props.children}
    </div>
}

export default NewCard;