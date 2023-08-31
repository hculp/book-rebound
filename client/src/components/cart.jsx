import { useEffect, useState, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './cartContext';

const stripePromise = loadStripe('pk_test_51NimDjDT6tfiNPpdPw5gNPITk6ta8X2oBoWNOUuIEFPtGR3gOO0HzXxxKnBE9mw6pUIvNXhcxZD66s28hbmU0hx500MBa74YtM');

const CartItem = ({ item }) => {
  return (
    <div key={item._id}>
      <h3>{item.name}</h3>
      <p>${item.price}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
};

const Cart = () => {
  const {cartProducts, addProduct, removeProduct, clearCart} = useContext(CartContext);

  useEffect(() => {
    stripePromise.then((stripe) => {
      setStripe(stripe);
    });
  }, []);

  function calculateTotal() {
    let sum = 0;
    cartProducts.forEach((productId) => {
      sum += productId.price * productId.quantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const session = stripe.checkout.createSession({
      payment_method_types: ['card'],
      line_items: cartProducts.map((product) => ({
        price: product.price,
        quantity: product.quantity,
        name: product.name,
      })),
      total_amount: calculateTotal(),
    });

    window.location.href = session.url;
  }

  function continueShopping() {
    useNavigate('/');
  }

  return (
    <div className='cart'>
      <h2>Your Cart</h2>
      {cartProducts.length ? (
        <div>
          {cartProducts.map((book) => (
            <CartItem key={book._id} item={book} />
          ))}
          <div className='flex-row space-between'>
            <strong>
              Total: ${calculateTotal()}
            </strong>
            <button onClick={submitCheckout}>Checkout</button>
            <button onClick={continueShopping}>Continue Shopping</button>
          </div>
        </div>
      ) : (
        <div>
          <h3>
            You haven't added anything to your cart yet!
          </h3>
          <button onClick={continueShopping}>Start Shoping Now!</button>
        </div>
      )}
    </div>
  );
};

export default Cart;