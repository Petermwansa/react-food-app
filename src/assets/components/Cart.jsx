import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../../store/CartContext'
import { currencyFormatter } from '../../util/formatting';
import Button from './UI/Button';
import UserProgressContext from '../../store/UserProgressContext';
import Cartitem from './Cartitem';

const Cart = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    // we are using the reduce() to calculate the total amount the cart 
    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price, 0);


    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    function handleCheckout() {
      userProgressCtx.showCheckout();
    }


  return (
    <Modal className='cart' 
      open={userProgressCtx.progress === 'cart'} 
      onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {/* here we map throught the items that are gotten using the cartCtx 
        and then use the Cartitem comp to render the data to the screen   */}
        {cartCtx.items.map(item => (
            <Cartitem 
                key={item.id}
                name={item.name}
                quantity={item.quantity}
                price={item.price}
                onIncrease={() => cartCtx.addItem(item)}
                onDecrease={() => cartCtx.removeItem(item.id)}
            />
        ))}
      </ul>
      <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
      <p className='modal-actions'>
        <Button textOnly onClick={handleCloseCart}>Close</Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleCheckout}>Go to checkout</Button>
        )}
      </p>

    </Modal>
  )
}

export default Cart
