"use client"
import React, { useContext } from "react";
import CartItem from "@/components/CartItem";
import { useCart } from "@/contexts/CartContext"; // Ensure CartContext is correctly defined
import { motion, AnimatePresence } from "framer-motion";

const Cart: React.FC = () => {
  const { cart, addItem, removeItem, incrementQuantity, decrementQuantity, getTotalCost } = useCart();

  return (
    <main className="w-full main flex-auto">
      <div className="container mx-auto">
        <div className="p-4 bg-white rounded-lg shadow-4xl">
          <div className="flex flex-col mb-6">
            <h2 className="text-lg flex items-center justify-start gap-2">
              سلة المشتريات
            </h2>
          </div>
          <ul className="flex flex-col">
            <AnimatePresence>
              {cart?.cartItems?.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  name={item.product.name}
                  description={item.product.description}
                  imageURL={item.product.imageURL}
                  price={item.product.price}
                  quantity={item.quantity}
                  increment={() => incrementQuantity(item.id, item.product.id)}
                  decrement={() => decrementQuantity(item.id, item.product.id)}
                  remove={() => removeItem(item.id)}
                />
              ))}
            </AnimatePresence>
          </ul>
          <div className="flex items-center justify-between px-4 py-8 border-gray-100 border-t border-b-1">
            <h3 className="font-bold text-xl">اجمالي السلة</h3>
            <span className="text-xl font-medium">
                {
                    new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "SAR",
                    }).format(getTotalCost() || 0)
                }
            </span>
          </div>
          <button
            type="button"
            className="w-full bg-primary text-white p-3 text-md rounded-md"
          >
            اتمام عملية الدفع
          </button>
        </div>
      </div>
    </main>
  );
};

export default Cart;
