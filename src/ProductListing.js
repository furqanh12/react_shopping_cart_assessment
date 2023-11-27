// ProductListing.js

import React, { useState, useEffect } from "react";
import ProductItem from "./ProductItem";

const ProductListing = ({ addToCart, colorFilter, cart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/benirvingplt/products/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = colorFilter
    ? products.filter(
        (product) => product.colour.toLowerCase() === colorFilter.toLowerCase()
      )
    : products;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-container">
      {filteredProducts.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          addToCart={addToCart}
          quantityInCart={
            cart.find((item) => item.id === product.id)?.quantity || 0
          }
        />
      ))}
    </div>
  );
};

export default ProductListing;
