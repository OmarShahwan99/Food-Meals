import { useContext, useEffect, useRef } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
    const cartCtx = useContext(CartContext);
    const buttonRef = useRef();
    useEffect(() => {
        if (cartCtx.items.length === 0) {
            return;
        }
        buttonRef.current.classList.add(classes.bump);
        const timer = setTimeout(() => {
            buttonRef.current.classList.remove(classes.bump);
        }, 300)
        return () => {
            clearTimeout(timer);
        }
    }, [cartCtx.items])

    const numberOfCartItems = cartCtx.items.reduce((currentNum, item) => {
        return currentNum + item.amount;
    }, 0)
    
    return (
        <button ref={buttonRef} onClick={props.onShow} className={classes.button}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span className={classes.text}>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton;