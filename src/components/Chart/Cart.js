import React , { useContext , useState } from 'react';

import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import Checkout from './CheckOut';

const Cart = (props)=>{

    const [isCheckOut , setIsCheckOut] = useState(false);
    const [isSubmitting , setIsSubmitting] = useState(false);
    const [doneSubmited , setDoneSubmited] = useState(false);

    const cartCtx = useContext(CartContext);
    
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`

    const Order = cartCtx.items.length > 0;

    const cartRemoveHandller = (id)=>{
        cartCtx.removeItem(id);
    }

    const cartAddHandler = (item) =>{
        cartCtx.addItem({...item , amount :1});
    }
    
    const cartItems=(
    <ul className={classes['cart-items']}>
        { cartCtx.items.map((item) =>(
            <CartItem 
                key ={item.id}
                name={item.name}
                price={item.price}
                amount={item.amount}  
                onRemove={cartRemoveHandller.bind(null , item.id)}
                onAdd={cartAddHandler.bind(null, item)}  
            />
        )) }   
    </ul>
    );

    const orderHandler = ()=>{
        setIsCheckOut(true);
    }

    const submitOrderHandler =async (userData)=>{
        setIsSubmitting(true);
        await fetch('https://meal-app-512-default-rtdb.firebaseio.com/ordres.json' , {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems : cartCtx.items
            }),
        });
        setIsSubmitting(false);
        setDoneSubmited(true);
        cartCtx.clearCart();
    }



    const actions = (
        <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                {Order && <button className={classes.button}  onClick={orderHandler}>Order</button>}
            </div>
    );

    

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckOut && (
                <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
            )}
            {!isCheckOut && actions}
        </React.Fragment>
    );
    
    const isSubmittingModalContent = <p>Sending order data...</p>;
    
    const didSubmitModalContent = (
        <React.Fragment>
        <p>Successfully sent the order!</p>
        <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
        Close
        </button>
    </div>
    </React.Fragment>
    );
    

    return (
    <Modal onClose={props.onClick}>
        {!isSubmitting && !doneSubmited && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && doneSubmited && didSubmitModalContent}
    </Modal>
    );
}

export default Cart; 