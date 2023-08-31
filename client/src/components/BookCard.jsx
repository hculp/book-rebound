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
          target.parentElement.querySelector('#bookCondition').textContent,
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
          >
            Add to Cart
          </button>
        </Card>
      ))}
    </div>
  );
};

export default BookCard;
