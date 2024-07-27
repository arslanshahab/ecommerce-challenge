import React from "react";
import { render, screen } from "@testing-library/react";
import Cart from "@/app/(root)/cart/page";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";

const mockCart = {
  cartItems: [
    {
      id: 1,
      product: { id: 101, name: "Product 1", price: 10 },
      quantity: 2,
    },
    {
      id: 2,
      product: { id: 102, name: "Product 2", price: 15 },
      quantity: 1,
    },
  ],
};

jest.mock("@/contexts/CartContext", () => ({
  ...jest.requireActual("@/contexts/CartContext"),
  useCart: () => ({
    cart: mockCart,
    getTotalCost: () => 35,
  }),
}));

test("calculates total cost correctly", () => {
  render(
    <AuthProvider>
      <CartProvider>
        <Cart />
      </CartProvider>
    </AuthProvider>
  );

  expect(screen.getByText("SAR 35.00")).toBeInTheDocument();
});
