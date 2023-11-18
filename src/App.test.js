/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import App from "./App";
import ProductItem from "./ProductItem";
import ShoppingCart from "./ShoppingCart";

describe("Product Listing App", () => {
  test("PLT-1: Viewing product listings", async () => {
    render(<App />);
    const productItems = await screen.findAllByTestId("product-item");
    expect(productItems.length).toBeGreaterThan(0);
  });

  test("PLT-2: Filter by colour", async () => {
    render(<App />);

    await waitFor(() => {
      const filterLabel = screen.getByText("Filter by Color:");
      expect(filterLabel).toBeInTheDocument();

      const filterSelect = screen.getByLabelText("Filter by Color:");
      expect(filterSelect).toBeInTheDocument();

      fireEvent.change(filterSelect, { target: { value: "black" } });
    });

    await waitFor(() => {
      const blackProductItems = screen.getAllByTestId("product-item");
      expect(blackProductItems.length).toBeGreaterThan(0);

      expect(
        blackProductItems.every((item) =>
          item.textContent.toLowerCase().includes("black")
        )
      ).toBe(true);
    });
  });

  test("Clicking 'Add to Cart' button calls addToCart function", () => {
    const addToCartMock = jest.fn();

    // Sample product data
    const product = {
      id: 1,
      name: "Sample Product",
      price: 19.99,
      img: "sample_image.jpg",
    };

    render(
      <ProductItem
        product={product}
        addToCart={addToCartMock}
        quantityInCart={0}
      />
    );

    // Click the "Add to Cart" button
    fireEvent.click(screen.getByText("Add to Cart"));

    expect(addToCartMock).toHaveBeenCalledWith(product);
  });

  test("Clicking + and - buttons increments and decrements the product quantity in the cart", async () => {
    // Sample product data
    const product = {
      id: 1,
      name: "Sample Product",
      price: 10,
      quantity: 1,
    };

    // Mock functions for handleQtyChange, handleRemoveFromCart, and calculateTotal
    const handleQtyChangeMock = jest.fn();
    const handleRemoveFromCartMock = jest.fn();
    const calculateTotalMock = jest.fn().mockReturnValue("10.00");

    render(
      <ShoppingCart
        cart={[product]}
        handleQtyChange={handleQtyChangeMock}
        handleRemoveFromCart={handleRemoveFromCartMock}
        calculateTotal={calculateTotalMock}
      />
    );

    // Click the "+" button
    fireEvent.click(screen.getByRole("button", { name: "+" }));

    await waitFor(() => {
      expect(handleQtyChangeMock).toHaveBeenCalledWith(product.id, true);

      expect(
        screen.getByText(/Product Price: \$10 x Qty: \d+/)
      ).toBeInTheDocument();

      expect(calculateTotalMock).toHaveBeenCalled();
    });

    fireEvent.click(screen.getByRole("button", { name: "-" }));

    await waitFor(() => {
      expect(handleQtyChangeMock).toHaveBeenCalledWith(product.id, false);

      expect(
        screen.getByText(/Product Price: \$10 x Qty: \d+/)
      ).toBeInTheDocument();

      expect(calculateTotalMock).toHaveBeenCalled();
    });
  });

  test("Clicking Remove button removes the product from the cart", async () => {
    const product = {
      id: 1,
      colour: "Black",
      name: "Black Sheet Strappy Textured Glitter Bodycon Dress",
      price: 10,
      img: "http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024",
    };

    const handleQtyChangeMock = jest.fn();
    const handleRemoveFromCartMock = jest.fn();
    const calculateTotalMock = jest.fn().mockReturnValue("0.00");

    render(
      <ShoppingCart
        cart={[product]}
        handleQtyChange={handleQtyChangeMock}
        handleRemoveFromCart={handleRemoveFromCartMock}
        calculateTotal={calculateTotalMock}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Remove" }));

    await waitFor(() => {
      expect(handleRemoveFromCartMock).toHaveBeenCalledWith(product.id);

      expect(screen.queryByText(/Product Price: \$10 x Qty: 1/)).toBeNull();

      expect(calculateTotalMock).toHaveBeenCalled();
    });
  });
});
