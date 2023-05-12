import classes from './Header.module.css';
import mealsImage from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = props => {
    return (
        <>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onShow={props.onShowCart}/>
            </header>
            <div className={classes.image}>
                <img src={mealsImage} alt="food"/>
            </div>
        </>
    )
}

export default Header