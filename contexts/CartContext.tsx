"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import { cartApi, Cart, CartItem } from "@/services/cart";
import toast from "react-hot-toast";

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  addItem: (productId: number, quantity: number) => Promise<void>;
  removeItem: (cartItemId: number) => Promise<void>;
  updateQuantity: (cartItemId: number, productId: number, quantity: number) => Promise<void>;
  refreshCart: (setToEmpty?: boolean) => Promise<void>;
  incrementQuantity: (cartItemId: number, productId: number) => Promise<void>;
  decrementQuantity: (cartItemId: number, productId: number) => Promise<void>;
  getTotalCost: () => number | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuthContext();

  const refreshCart = async (setToEmpty: boolean = false) => {
    if (!token || setToEmpty) {
      setCart(null);
      return;
    }
    setLoading(true);
    try {
      const newCart = await cartApi.getCart(token);
      setCart(newCart);
      setError(null);
    } catch (err) {
      setError("Failed to fetch cart");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, [token]);

  const addItem = async (productId: number, quantity: number) => {
    if (!token) {
      toast.error("Please log in to add items to your cart");
      return;
    }
    setLoading(true);
    try {
      await cartApi.addToCart(token, productId, quantity);
      toast.success("Item added to cart");
      await refreshCart();
    } catch (err) {
      setError("Failed to add item to cart");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (cartItemId: number) => {
    if (!token) return;
    setLoading(true);
    try {
      await cartApi.removeFromCart(token, cartItemId);
      await refreshCart();
    } catch (err) {
      setError("Failed to remove item from cart");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (
    cartItemId: number,
    productId: number,
    quantity: number
  ) => {
    if (!token) return;
    setLoading(true);
    try {
      await cartApi.updateCartItem(token, cartItemId, productId, quantity);
      await refreshCart();
    } catch (err) {
      setError("Failed to update item quantity");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const incrementQuantity = async (cartItemId: number, productId: number) => {
    if (!token) return;
    const item = cart?.cartItems.find((item) => item.id === cartItemId);
    if (!item) return;
    const newQuantity = item.quantity + 1;
    await updateQuantity(cartItemId, productId, newQuantity);
  };

  const decrementQuantity = async (cartItemId: number, productId: number) => {
    if (!token) return;
    const item = cart?.cartItems.find((item) => item.id === cartItemId);
    if (!item) return;
    const newQuantity = item.quantity - 1;
    if (newQuantity <= 0) {
      await removeItem(cartItemId);
    } else {
      await updateQuantity(cartItemId, productId, newQuantity);
    }
  };

  const getTotalCost = () => {
    return cart?.cartItems?.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addItem,
        removeItem,
        updateQuantity,
        refreshCart,
        incrementQuantity,
        decrementQuantity,
        getTotalCost,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
