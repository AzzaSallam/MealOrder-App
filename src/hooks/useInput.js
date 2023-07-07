import { useState } from "react";

const useInput = (validationValue)=>{

    const [enteredValue , setInteredValue] = useState('');
    const [isTouched , setIsTouched] = useState(false);

    const valueIsValid = validationValue(enteredValue);
    const notValid = !valueIsValid && isTouched;

    const changeValueHandller = event =>{
        setInteredValue(event.target.value);
    }

    const inputTouchedHandller = event=>{
        setIsTouched(true);
    }

    const reset = ()=>{
        setInteredValue('');
        setIsTouched(false);
    }

    return{
        value :enteredValue,
        isValid : valueIsValid,
        notValid,
        changeValueHandller,
        inputTouchedHandller,
        reset
    }
}

export default useInput;