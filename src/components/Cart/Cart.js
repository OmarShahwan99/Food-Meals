import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem/CartItem';
import OrderForm from '../Checkout/OrderForm';
import Loading from '../UI/Loading';

const Cart = props => {
    const [orderFormIsVisible, setOrderFormIsVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const orderHandler = () => {
        setOrderFormIsVisible(true);
    }

    const cartCtx = useContext(CartContext);
    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount: 1})
    };
    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const submitCartDataHandler = (orderFormData) => {
        setIsSubmitting(true);
        const cartData = {
            orderedMeals: cartCtx.items,
            totalAmount: cartCtx.totalAmount,
            userData: orderFormData,
        }
        fetch('https://meals-project-e557d-default-rtdb.firebaseio.com/order.json', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(cartData),
        })
            .then(res => {
                setIsSubmitting(false);
                setDidSubmit(true);
                return res.json();
            })
            .then(data => console.log(data))
            .catch(error => {
                setIsSubmitting(false)
                console.log(error);
            })
        cartCtx.clearCart();
    }

    

    const cartItems =
        <ul>
            {cartCtx.items.map(item =>
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onAdd={cartItemAddHandler.bind(null, item)}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                />)}
        </ul>
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasCarts = cartCtx.items.length > 0;

    const cartModalContent =
        <>
            <div className={classes['cart-items']}>
                {cartItems}
            </div>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {orderFormIsVisible && <OrderForm onSubmit={submitCartDataHandler} onCancel={props.onClose}/>}
            {!orderFormIsVisible && <div className={classes.actions}>
                <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
                {hasCarts && <button onClick={orderHandler} className={classes.button}>Order</button>}
            </div>}
        </>
    
    const submittingModalContent = <Loading />;

    const didSubmitModalContent =
        <>
            <p style={{marginBottom: '20px'}}>Your order has been sent succesfully.</p>
            <div className={classes.actions}>
                <button onClick={props.onClose} className={classes.button}>Close</button>
            </div>
        </>;

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && submittingModalContent}
            {didSubmit && didSubmitModalContent}
        </Modal>
    )
}

export default Cart;