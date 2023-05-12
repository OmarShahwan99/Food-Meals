import classes from './CartItem.module.css';

const CartItem = props => {
    const price = `$${props.price.toFixed(2)}`;
    return (
        <li className={classes['cart-item']}>
            <div>
                <h2>{props.name}</h2>
                <span className={classes.price}>{price}</span>
                <span className={classes.amount}>× {props.amount}</span>
            </div>
            <div className={classes.actions}>
                <button onClick={props.onAdd}>+</button>
                <button onClick={props.onRemove}>ـ</button>
            </div>
        </li>
    );
}

export default CartItem;