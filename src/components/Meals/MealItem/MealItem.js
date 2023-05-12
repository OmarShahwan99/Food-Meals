import { useContext } from 'react';
import CartContext from '../../../store/cart-context';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = (props) => {
    const ctx = useContext(CartContext);
    const addToCartHandler = amount => {
        ctx.addItem({
            id: props.id,
            amount: amount,
            price: props.price,
            name: props.name
        })
    }
    return (
        <li className={classes['meal-item']}>
            <div className={classes.description}>
                <h2>{props.name}</h2>
                <p>{props.description}</p>
                <span>{`$${props.price.toFixed(2)}`}</span>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler}/>
            </div>
        </li>
    )
}

export default MealItem;