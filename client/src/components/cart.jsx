import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NimDjDT6tfiNPpdPw5gNPITk6ta8X2oBoWNOUuIEFPtGR3gOO0HzXxxKnBE9mw6pUIvNXhcxZD66s28hbmU0hx500MBa74YtM');

const CartItem = (data) => {
  const product = JSON.parse(data.product);
  const listedPrice = parseFloat(product.listedPrice.replace('$', ''));
  const price = parseInt(listedPrice);

  return (
    <div id='cart-item' key={product._id}>
      <h3 id='cart-book-title'>{product.title}</h3>
      <p id='cart-book-price'>${price}</p>
    </div>
  );
};

const Cart = (props) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const getCartProducts = async () => {
    const cartProductsFromLocalStorage = localStorage.getItem('cart');
    if (cartProductsFromLocalStorage) {
      const parsedCartProducts = JSON.parse(cartProductsFromLocalStorage);
      setCartProducts(parsedCartProducts);
    }
  };

  useEffect(() => {
    getCartProducts();
  }, []);

  function submitCheckout() {
    // Your checkout logic here
  }

  return (
    <div className='cart'>
      <h2 id='cart-title'>Your Cart</h2>
      {cartProducts.length ? (
        <div>
          {cartProducts.map((data) => (
            <CartItem product={data} totalPrice={totalPrice} />
          ))}
          <div className='flex-row space-between'>
            <div>
              <button id='checkout-btn' onClick={submitCheckout}>Checkout</button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h3>
            You haven't added anything to your cart yet!
          </h3>
        </div>
      )}
    </div>
  );
};

export default Cart;