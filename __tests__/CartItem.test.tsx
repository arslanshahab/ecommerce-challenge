import React from "react";
import { render, screen } from "@testing-library/react";
import Cart from "@/app/(root)/cart/page";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";

const mockCart = {
  cartItems: [
    {
      id: 1,
      product: {
        id: 101,
        name: "Test Product",
        description: "Test Description",
        imageURL: "test.jpg",
        price: 10,
      },
      quantity: 2,
    },
  ],
};

jest.mock("@/contexts/CartContext", () => ({
  ...jest.requireActual("@/contexts/CartContext"),
  useCart: () => ({
    cart: mockCart,
    getTotalCost: () => 20,
    incrementQuantity: jest.fn(),
    decrementQuantity: jest.fn(),
    removeItem: jest.fn(),
  }),
}));

test("renders CartItems", () => {
  render(
    <AuthProvider>
      <CartProvider>
        <Cart />
      </CartProvider>
    </AuthProvider>
  );

  expect(screen.getByText("Test Product")).toBeInTheDocument();
  expect(screen.getByText("x 2")).toBeInTheDocument();
  expect(screen.getByText("10.00 SAR")).toBeInTheDocument();
});
