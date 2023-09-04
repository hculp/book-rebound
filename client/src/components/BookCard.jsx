import React, { useState, useEffect, useContext, useRef } from 'react';
import { Card } from 'flowbite-react';
import data from '../../../server/seeds/books.json';

const BookCard = () => {
  const [cartProducts, setCartProducts] = useState([]);

  const addToCart = (event) => {
    const target = event.target;
    if (target.tagName === 'BUTTON') {
      const product = {
        _id: target.parentElement._id,
        title: target.parentElement.querySelector('#bookTitle').textContent,
        condition:
          target.parentElement.querySelector('#bookCondition').textContent,
        listedPrice:
          target.parentElement.querySelector('#bookPrice').textContent,
      };
      const productString = JSON.stringify(product);
      cartProducts.push(productString);
      localStorage.setItem('cart', JSON.stringify(cartProducts));
    }
  };

  return (
    <div>
      {data.map((data, index) => (
        <Card key={data._id} href="#">
          <h5
            id="bookTitle"
            className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {data.title}
          </h5>
          <p id="bookCondition">{data.condition}</p>
          <p id="bookPrice">${data.listedPrice}</p>
          <button 
          onClick={(event) => {
            if (event.target === event.currentTarget) {
            addToCart(event);
            }
            }}
            type="button"
            className="text-white bg-forestfront-50 hover:bg-forestback-50 focus:ring-4 focus:outline-none focus:ring-bg-forestback-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-forestback-600 dark:hover:bg-forestback-700 dark:focus:ring-forestback-800"
          >
            <svg
              className="w-3.5 h-3.5 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 21"
            >
              <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
            </svg>
            Add to Cart
          </button>
        </Card>
      ))}
    </div>
  );
};

export default BookCard;