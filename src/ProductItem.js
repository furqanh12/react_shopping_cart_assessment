// ProductItem.js
import React from "react";

const ProductItem = ({ product, addToCart, quantityInCart }) => (
  <div className="product-item" data-testid="product-item">
    <img src={product.img} alt={product.name} className="product-image" />
    <p>{product.name}</p>
    <p>${product.price}</p>
    <p>Qty in Bag: {quantityInCart}</p>
    <button onClick={() => addToCart(product)}>Add to Cart</button>
  </div>
);

export default ProductItem;
