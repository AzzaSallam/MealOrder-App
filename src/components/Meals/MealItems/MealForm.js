import { useRef  , useState} from 'react';

import Input from '../../UI/Input';
import classes from'./MealForm.module.css';


const MealForm = (props)=>{
    
    const [amountIsValid , setAmountIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = event =>{
        event.preventDefault();

        const interedAmount = amountInputRef.current.value;
        const interedAmountNum = +interedAmount;

        if(interedAmount.trim().length === 0 || interedAmountNum <1 || interedAmountNum >5){
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(interedAmountNum);
    };

    return(
        <form className={classes.form} onSubmit={submitHandler}>
            <Input ref={amountInputRef} label='Amount' input={{
                id: props.id,
                type : 'number',
                min :'1',
                max:'5',
                step:'1',
                defaultValue:'1'
            }}
            />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
        </form>
    )

}

export default MealForm;