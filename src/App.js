import Header from "./components/layout/Header";
import './App.css';
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import React, { useState } from 'react';
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsVisible, setCartIsVisible] = useState(false);

  const showCartHandler = () => {
    setCartIsVisible(true);
  }

  const closeCartHandler = () => {
    setCartIsVisible(false);
  }


  return (
    <CartProvider>
      {cartIsVisible && <Cart onClose={closeCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
