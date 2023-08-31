import React, { useState, useEffect, useContext, useNavigate } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NimDjDT6tfiNPpdPw5gNPITk6ta8X2oBoWNOUuIEFPtGR3gOO0HzXxxKnBE9mw6pUIvNXhcxZD66s28hbmU0hx500MBa74YtM');

const CartItem = ({ data = { title: '', price: 0, quantity: 0 }}) => {
  return (
    <div key={data._id}>
      <h3>{data.title}</h3>
      <p>${data.price}</p>
    </div>
  );
};

const Cart = () => {

  const [cartProducts, setCartProducts] = useState([]);
  
  useEffect(() => {
  const getCartProducts = async () => {
  const cartProductsFromLocalStorage = localStorage.getItem('cart');
  if (cartProductsFromLocalStorage) {
  setCartProducts(JSON.parse(cartProductsFromLocalStorage));
  }
  };
  
  getCartProducts();
  }, []);
  
  // ...
  
  function submitCheckout() {
  context.submitCheckout();
  }
  
  // ...
  
  return (
  <div className='cart'>
  <h2>Your Cart</h2>
  {cartProducts.length ? (
  <div>
  {cartProducts.map((data) => (
  <CartItem product={data} />
  ))}
  <div className='flex-row space-between'>
  <strong>
  {/* Total: ${calculateTotal()} */}
  </strong>
  <button onClick={submitCheckout}>Checkout</button>
  {/* <button onClick={continueShopping}>Continue Shopping</button> */}
  </div>
  </div>
  ) : (
  <div>
  <h3>
  You haven't added anything to your cart yet!
  </h3>
  {/* <button onClick={continueShopping}>Start Shoping Now!</button> */}
  </div>
  )}
  </div>
  );
  };
  
  export default Cart;