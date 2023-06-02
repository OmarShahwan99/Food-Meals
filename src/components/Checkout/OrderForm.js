import classes from "./OrderForm.module.css";
import useInput from "../../hooks/use-input";

const textValidation = (value) => {
  return value.trim() !== "";
};

const phoneValidation = (value) => {
  return value.length === 10;
};

const codeValidation = (value) => {
  return value.length === 5;
};

const OrderForm = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameHasError,
    blurHandler: nameBlurHandler,
    valueChangeHandler: nameChangeHandler,
    reset: resetName,
  } = useInput(textValidation);

  const {
    value: enteredPhone,
    isValid: enteredPhoneIsValid,
    hasError: phoneHasError,
    blurHandler: phoneBlurHandler,
    valueChangeHandler: phoneChangeHandler,
    reset: resetPhone,
  } = useInput(phoneValidation);

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetHasError,
    blurHandler: streetBlurHandler,
    valueChangeHandler: streetChangeHandler,
    reset: resetStreet,
  } = useInput(textValidation);

  const {
    value: enteredCode,
    isValid: enteredCodeIsValid,
    hasError: codeHasError,
    blurHandler: codeBlurHandler,
    valueChangeHandler: codeChangeHandler,
    reset: resetCode,
  } = useInput(codeValidation);

  let FormIsValid = false;

  if (
    enteredNameIsValid &&
    enteredPhoneIsValid &&
    enteredStreetIsValid &&
    enteredCodeIsValid
  ) {
    FormIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();
    if (!FormIsValid) {
      return;
    }

    const userData = {
      name: enteredName,
      phone: enteredPhone,
      street: enteredStreet,
      code: enteredCode,
    };

    props.onSubmit(userData);

    resetName();
    resetPhone();
    resetStreet();
    resetCode();
  };

  const invalidNameClasses = nameHasError ? classes.invalid : "";
  const invalidPhoneClasses = phoneHasError ? classes.invalid : "";
  const invalidStreetClasses = streetHasError ? classes.invalid : "";
  const invalidCodeClasses = codeHasError ? classes.invalid : "";

  return (
    <div className={classes["order-form"]}>
      <form onSubmit={confirmHandler}>
        <div className={invalidNameClasses}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
          />
          {nameHasError && (
            <p className={classes["error-text"]}>Invalid Name</p>
          )}
        </div>
        <div className={invalidPhoneClasses}>
          <label htmlFor="phone">Your Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            onChange={phoneChangeHandler}
            onBlur={phoneBlurHandler}
            value={enteredPhone}
          />
          {phoneHasError && (
            <p className={classes["error-text"]}>Phone must have 10 numbers.</p>
          )}
        </div>
        <div className={invalidStreetClasses}>
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            name="street"
            onChange={streetChangeHandler}
            onBlur={streetBlurHandler}
            value={enteredStreet}
          />
          {streetHasError && (
            <p className={classes["error-text"]}>Street musn't be empty.</p>
          )}
        </div>
        <div className={invalidCodeClasses}>
          <label htmlFor="code">Postal Code</label>
          <input
            type="text"
            id="code"
            name="code"
            onChange={codeChangeHandler}
            onBlur={codeBlurHandler}
            value={enteredCode}
          />
          {codeHasError && (
            <p className={classes["error-text"]}>
              Pestal code must have 5 numberes.
            </p>
          )}
        </div>
        <div className={classes.actions}>
          <button disabled={!FormIsValid} className={classes.button}>
            Confirm
          </button>
          <button
            className={classes["button--alt"]}
            onClick={props.onCancel}
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
