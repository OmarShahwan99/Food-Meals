import { useState } from "react";

const useInput = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);

    const hasError = !valueIsValid && isTouched;

    const blurHandler = () => {
        setIsTouched(true);
    }

    const valueChangeHandler = (event) => {
        setEnteredValue(event.target.value);
    }

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    }

    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError: hasError,
        blurHandler,
        valueChangeHandler,
        reset
    }
}

export default useInput;