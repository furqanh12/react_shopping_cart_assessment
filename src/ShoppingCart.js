import React from "react";

const ShoppingCart = ({
  cart,
  handleQtyChange,
  handleRemoveFromCart,
  calculateTotal,
}) => {
  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      <div className="cart-view">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.img} alt={item.name} className="product-image" />

            <p>{item.name}</p>
            <p>
              Product Price: ${item.price} x Qty: {item.quantity}
            </p>
            <div className="cart-buttons">
              <button onClick={() => handleQtyChange(item.id, false)}>-</button>
              <button onClick={() => handleQtyChange(item.id, true)}>+</button>
              <button onClick={() => handleRemoveFromCart(item.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <p className="cart-total">Total: ${calculateTotal()}</p>
    </div>
  );
};

export default ShoppingCart;
