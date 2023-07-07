import useInput from '../../hooks/useInput';
import classes from './CheckOut.module.css';


const Checkout = (props)=>{

    const {
        value :enteredName,
        isValid : enteredNameIsValid,
        notValid : nameNotValid,
        changeValueHandller :nameChangeHandler,
        inputTouchedHandller : nameBlur,
        reset : resetName
    } = useInput(value => value.trim() !== '');
    
    const {
        value :enteredStreer,
        isValid : enteredStreetIsValid,
        notValid : streetNotValid,
        changeValueHandller :streetChangeHandler,
        inputTouchedHandller : streetBlur,
        reset : resetStreet
    } = useInput(value => value.trim() !== '');
    
    const {
        value :enteredPostalCode,
        isValid : enteredPostalCodeIsValid,
        notValid : postalCodeNotValid,
        changeValueHandller :postalCodeChangeHandler,
        inputTouchedHandller : postalCodeBlur,
        reset : resetPostalCode
    } = useInput(value => value.trim().length === 5);
    
    const {
        value :enteredCity,
        isValid : enteredCityIsValid,
        notValid : cityNotValid,
        changeValueHandller :cityChangeHandler,
        inputTouchedHandller : cityBlur,
        reset : resetCity
    } = useInput(value => value.trim() !== '');
    

    let formIsValid = false;
    if(enteredNameIsValid && enteredStreetIsValid && enteredPostalCodeIsValid && enteredCityIsValid){
        formIsValid = true;
    }
    
    
    

    const confirmHandler = event=>{
        event.preventDefault();

        if(!formIsValid){
            return;
        }

        console.log(enteredName);
        console.log(enteredStreer);
        console.log(enteredPostalCode);
        console.log(enteredCity);

        props.onConfirm({
            name:enteredName,
            street:enteredStreer,
            postalcode :enteredPostalCode,
            city: enteredCity
        });

        
        resetName();
        resetStreet();
        resetPostalCode();
        resetCity();

    }



    const nameClasses = `${classes.control} ${nameNotValid ? classes.invalid : '' }`;
    const streetClasses = `${classes.control} ${streetNotValid ? classes.invalid : '' }`;
    const postalClasses = `${classes.control} ${postalCodeNotValid ? classes.invalid : '' }`;
    const cityClasses = `${classes.control} ${cityNotValid ? classes.invalid : '' }`;

    return (
    <form className={classes.form} onSubmit={confirmHandler} >
        <div className={nameClasses}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' 
            id='name' 
            onChange={nameChangeHandler}
            onBlur={nameBlur}
            value={enteredName} />
            {nameNotValid &&<p>Please enter a valid name </p>}
        </div>
        <div className={streetClasses}>
            <label htmlFor='street'>Street</label>
            <input type='text' 
                    id='street'
                    onChange={streetChangeHandler}
                    onBlur={streetBlur}
                    value={enteredStreer}
            />
            {streetNotValid &&<p>Please enter a valid street </p>}
        </div>
        <div className={postalClasses}>
            <label htmlFor='postal'>Postal Code</label>
            <input type='text' 
                    id='postal'
                    onChange={postalCodeChangeHandler}
                    onBlur={postalCodeBlur}
                    value={enteredPostalCode}
            />
            {postalCodeNotValid &&<p>Please enter a valid postalCode (5-digit) </p>}
        </div>
        <div className={cityClasses}>
            <label htmlFor='city'>City</label>
            <input type='text' 
                    id='city' 
                    onChange={cityChangeHandler}
                    onBlur={cityBlur}
                    value={enteredCity}
            />
            {cityNotValid &&<p>Please enter a valid city </p>}
        </div>
        <div className={classes.actions}>
            <button type='button' onClick={props.onCancle}> Cancel </button>
            <button className={classes.submit}>Confirm</button>
        </div>
        </form>
    );
};

export default Checkout;