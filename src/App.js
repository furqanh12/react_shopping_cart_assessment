// App.js
import React, { useState } from "react";
import ProductListing from "./ProductListing";
import ShoppingCart from "./ShoppingCart";
import "./App.css";

const App = () => {
  const [cart, setCart] = useState([]);
  const [colorFilter, setColorFilter] = useState("");

  const handleColorFilter = (color) => {
    setColorFilter(color);
  };

  const addToCart = (product) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const handleQtyChange = (productId, increment) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === productId) {
            // Update the quantity first
            return {
              ...item,
              quantity: increment ? item.quantity + 1 : item.quantity - 1,
            };
          }
          return item;
        })
        .filter((item) => item.quantity > 0); // Remove items with quantity <= 0
    });
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div>
      <h1>Product Listings</h1>

      <div className="filter-container">
        <label htmlFor="colorFilter" className="filter-label">
          Filter by Color:
        </label>
        <select
          id="colorFilter"
          onChange={(e) => handleColorFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="black">Black</option>
          <option value="red">Red</option>
          <option value="stone">Stone</option>
        </select>
      </div>

      <ProductListing
        addToCart={addToCart}
        colorFilter={colorFilter}
        cart={cart}
      />
      <div className="divider"></div>
      <ShoppingCart
        cart={cart}
        handleQtyChange={handleQtyChange}
        handleRemoveFromCart={handleRemoveFromCart}
        calculateTotal={calculateTotal}
      />
    </div>
  );
};

export default App;
