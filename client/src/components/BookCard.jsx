import React, {useState, useEffect, useContext} from 'react';
import { Card } from 'flowbite-react';
import data from '../../../server/seeds/books.json';
import { CartContext } from './cartContext';


const BookCard = () => {

  const addProduct = useContext(CartContext).addProduct;
  function addToCart() {
   
    addProduct(data._id);
  }


  return (
    <div>
      {data.map((data) => (
        <Card key={data._id} href="#">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data.title}
          </h5>
          <p>{data.condition}</p>
          <p>${data.listedPrice}</p>
          <button onClick={addToCart}>Add to Cart</button>
        </Card>
      ))}
    </div>
  );
};

export default BookCard;