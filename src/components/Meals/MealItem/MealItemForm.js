import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';
import { useRef, useState } from 'react';

const MealItemForm = props => {
    const [amountIsValid, setAmountIsValid] = useState(true)
    const amountRef = useRef();
    const submitAmount = event => {
        event.preventDefault();
        const enteredAmount = amountRef.current.value;
        const enteredAmountNumber = +amountRef.current.value;
        if (enteredAmount.trim().length === 0 || 
            enteredAmountNumber < 1 ||
            enteredAmountNumber > 5  
        ) {
            setAmountIsValid(false);
            return;
        }
        props.onAddToCart(enteredAmountNumber);
    }
    return (
        <form onSubmit={submitAmount}>
            <div className={classes['form-input']}>
                <Input
                    ref={amountRef}
                    label="Amount"
                    input={{
                        id: 'amount',
                        type: 'number',
                        min: '1',
                        max: '5',
                        step: '1',
                        defaultValue: '1'
                    }}
                />
                <button>+ Add</button>
                {!amountIsValid && <p>Please enter a valid amount (0-5).</p>}
            </div>
        </form>
    )
}

export default MealItemForm;