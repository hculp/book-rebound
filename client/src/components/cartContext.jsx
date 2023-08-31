import {createContext, useEffect, useState} from "react";

export const CartContext = createContext({});

export function CartContextProvider({children}) {
  // const ls = typeof window !== "undefined" ? window.localStorage : undefined;
  const [cartProducts,setCartProducts] = useState([]);

  useEffect(() => {
    console.log(cartProducts)
    if (cartProducts?.length > 0) {
        localStorage.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (localStorage.getItem('cart')!==undefined); {
      setCartProducts(JSON.parse(localStorage.getItem('cart')));
    }
    function storageEventHandler(event) {
      if (event.key === "cart") {
          const cartProducts = JSON.parse(event.newValue);
          setCartProducts(cartProducts);
      }
  }
  // Hook up the event handler
  window.addEventListener("storage", storageEventHandler);
  return () => {
      // Remove the handler when the component unmounts
      window.removeEventListener("storage", storageEventHandler);
  };
  }, []);

  function addProduct(data) {
    setCartProducts([...cartProducts, JSON.stringify(data._Id)]);
}
  function removeProduct(data) {
    setCartProducts(prev => {
      const pos = prev.indexOf(data._id);
      if (pos !== -1) {
        return prev.filter((value,index) => index !== pos);
      }
      return prev;
    });
  }
  function clearCart() {
    setCartProducts([]);
  }

  return (
    <CartContext.Provider value={{cartProducts,setCartProducts,addProduct,removeProduct,clearCart}}>
      {children}
    </CartContext.Provider>
  );
}