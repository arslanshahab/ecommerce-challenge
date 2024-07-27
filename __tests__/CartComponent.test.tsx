import React from "react";
import { render, screen } from "@testing-library/react";
import Cart from "@/app/(root)/cart/page";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";

jest.mock("@/contexts/CartContext", () => ({
  ...jest.requireActual("@/contexts/CartContext"),
  useCart: () => ({
    cart: { cartItems: [] },
    getTotalCost: () => 0,
  }),
}));

test("renders Cart component", () => {
  render(
    <AuthProvider>
      <CartProvider>
        <Cart />
      </CartProvider>
    </AuthProvider>
  );

  expect(screen.getByText("سلة المشتريات")).toBeInTheDocument();
  expect(screen.getByText("اجمالي السلة")).toBeInTheDocument();
  expect(screen.getByText("اتمام عملية الدفع")).toBeInTheDocument();
});
