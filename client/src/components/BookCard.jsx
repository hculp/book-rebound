import React from 'react';
import { Card } from 'flowbite-react';
import { useContext } from 'react';
import { CartContext } from './cartContext';

export default function BookCard({ book }) {
 const addProduct = useContext(CartContext).addProduct;
  function addToCart() {
   
    addProduct(book._id);
  }

  return (
    <div>
      <Card className="max-w-sm border-black bg-gradient-to-br from-forestfront-50 from-10% to-forestfront-100 via-90%" href="#">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <p>Test card title</p>
        </h5>
        <p>Test card text</p>
        <button onClick={addToCart}>Add to Cart</button>
      </Card>
    </div>
  );
}