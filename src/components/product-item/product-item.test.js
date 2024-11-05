import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useCartContext } from "../../hooks/use-cart-context";
import { useToast } from "../../hooks/use-toast";
import ProductItem from "./product-item";

jest.mock("../../hooks/use-cart-context");
jest.mock("../../hooks/use-toast");

describe("ProductItem Component", () => {
  const mockAddItemToCart = jest.fn();
  const mockShowToast = jest.fn();

  beforeEach(() => {
    useCartContext.mockReturnValue({ addItemToCart: mockAddItemToCart });
    useToast.mockReturnValue({ showToast: mockShowToast });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("adds item to cart and shows toast message", () => {
    const product = {
      name: "Test Product",
      price: 29.99,
      rate: 4.5,
      popularity: 120,
    };

    render(<ProductItem product={product} />);

    const addToCartButton = screen.getByRole("button");
    fireEvent.click(addToCartButton);

    expect(mockAddItemToCart).toHaveBeenCalledWith(product);

    expect(mockShowToast).toHaveBeenCalledWith("Added to Cart", "success", 800);
  });
});
