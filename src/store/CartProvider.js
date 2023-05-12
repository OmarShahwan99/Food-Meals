import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartItem = {
    items: [],
    totalAmount: 0
}

const reducerCartItems = (state, action) => {
    if (action.type === 'ADD') {
        const exsistingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const exsistingCartItem = state.items[exsistingCartItemIndex];

        let updatedItems;
        if (exsistingCartItem) {
            const updatedItem = {
                ...exsistingCartItem,
                amount: action.item.amount + exsistingCartItem.amount
            }
            updatedItems = [...state.items]
            updatedItems[exsistingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    } else if (action.type === 'REMOVE') {
        const removedItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingRemovedItem = state.items[removedItemIndex];
        let updatedAmount = existingRemovedItem.amount - 1;
        let updatedItems;
        const updatedTotalAmount = state.totalAmount - existingRemovedItem.price;
        if (updatedAmount < 1) {
            updatedItems = state.items.filter(item => {
                return item.id !== action.id;
            })
        } else {
            const updatedItem = {
                ...existingRemovedItem,
                amount: updatedAmount,
            }
            updatedItems = [...state.items];
            updatedItems[removedItemIndex] = updatedItem;
            
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if (action.type === 'CLEAR') {
        return defaultCartItem;
    }
    return defaultCartItem;
}

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(reducerCartItems, defaultCartItem);
    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: 'ADD', item: item})
    };
    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE', id: id})
    };

    const clearCartHandler = () => {
        dispatchCartAction({ type: 'CLEAR' });
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler,
    }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;