import React, { useContext } from 'react';
import logoImg from '../logo.jpg'
import Button from './UI/Button';
import CartContext from '../../store/CartContext';
import UserProgressContext from '../../store/UserProgressContext';

const Header = () => {

    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    // the reduce method helps us to reduce an array to a single number 
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0)

    // this function will utilise the userProgressCtx provided and ahow the cart from the data that is there 
    function handleShowCart() {
      userProgressCtx.showCart();
    }

  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logoImg} alt='rockie eats logo'/>
        <h1>Rockie Eats</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  )
}

export default Header;
