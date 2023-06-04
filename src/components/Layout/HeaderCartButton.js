import { useContext , useEffect , useState } from 'react';

import CartIcon from '../Chart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';


const HeaderCartButton = props =>{

    const [btnHilated , setBtnHilated] =useState(false);

    const cartCtx = useContext(CartContext);
    
    const {items} = cartCtx;

    const numOfCartItem = items.reduce((curNum , item)=>{
        return curNum + item.amount;
    } , 0);


    const btnClasses = `${classes.button} ${btnHilated ? classes.bump :''}` ;

    useEffect(()=>{
        if(items.length === 0){
            return ; 
        }
        setBtnHilated(true);

        const timer = setTimeout(()=>{
            setBtnHilated(false);
        } , 300)
        
        return ()=>{
            clearTimeout(timer);
        }
    } , [items])

    return( 
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numOfCartItem}</span>
        </button>
)};

export default HeaderCartButton;