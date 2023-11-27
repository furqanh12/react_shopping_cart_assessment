// ProductItem.js
import React from "react";

const ProductItem = ({ product, addToCart, quantityInCart }) => (
  <div className="product-item" data-testid="product-item">
    <img src={product.img} alt={product.name} className="product-image" />
    <p className="product-name">{product.name}</p>
    <p>Price: ${product.price}</p>
    <p>Qty in Bag: {quantityInCart}</p>
    <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
      Add to Cart
    </button>
  </div>
);

export default ProductItem;
