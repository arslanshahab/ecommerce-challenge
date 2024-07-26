"use client";
import Link from "next/link";
import React from "react";
import { useCart } from "@/contexts/CartContext";

const CartIcon = () => {
  const { cart } = useCart();
  const totalItems =
    cart?.cartItems.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <div className="relative">
      <Link
        href="/cart"
        type="button"
        className="w-10 h-10 rounded-full text-center flex items-center justify-center bg-secondary-50 text-primary"
      >
        <i className="sicon-shopping-bag"></i>
      </Link>
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
