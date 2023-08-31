import React, { useState, useEffect, useContext, useNavigate } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CartContext } from './cartContext';

const stripePromise = loadStripe('pk_test_51NimDjDT6tfiNPpdPw5gNPITk6ta8X2oBoWNOUuIEFPtGR3gOO0HzXxxKnBE9mw6pUIvNXhcxZD66s28hbmU0hx500MBa74YtM');

const CartItem = ({ product }) => {
  return (
    <div key={product._id}>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <p>Quantity: {product.quantity}</p>
    </div>
  );
};

const Cart = () => {
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);

  useEffect(() => {
    stripePromise.then((stripe) => {
      setStripe(stripe);
    });
  }, []);

  function calculateTotal() {
    let sum = 0;
    cartProducts.forEach((product) => {
      sum += product.price * product.quantity;
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
    clearCart()
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
            <CartItem product={book} />
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