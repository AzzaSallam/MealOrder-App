import { Fragment } from "react";
import LandingImg from '../../assets/top-view-sushi-plating-bamboo-mat.jpg';
import HeaderCartButton from "./HeaderCartButton";
import classes from './Header.module.css';

const Header = (props) =>{
    return <Fragment>
        <header className={classes.header}>
            <h1>AzzaMeals</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div className={classes.landing}>
            <img src={LandingImg} alt='A Table Full Of Delicious Food !'/>
        </div>
    </Fragment>
    
};

export default Header ;