// components/CartItem.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface CartItemProps {
  id: number;
  name: string;
  imageURL: string;
  price: number;
  quantity: number;
  increment: () => void;
  decrement: () => void;
  remove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ id, name, imageURL, price, quantity, increment, decrement, remove }) => {
  return (
    <motion.li
      className="flex items-start sm:items-center flex-col sm:flex-row justify-between gap-4 w-full p-4 rounded-md transition-all hover:bg-grayer-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Link href={`product-details/${id}`} className="flex items-start justify-center gap-2 flex-1">
        <img className="rounded-md w-9 object-cover shrink-0 overflow-hidden" src={imageURL} alt={name} />
        <div className="flex flex-col flex-1 gap-1">
          <h4>{name}</h4>
          <div className="flex items-center justify-start gap-2">
            <b className="ltr">x {quantity}</b><span className="text-xs text-gray-500">{price.toFixed(2)} SAR</span>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-center gap-4">
        <div className="flex shrink-0 items-center justify-center p-2 border border-1 border-gray-200 rounded-lg">
          <button onClick={increment} className="shrink-0 px-2 text-md text-gray-500">+</button>
          <input type="number" value={quantity} readOnly className="w-[50px] flex-1 text-center appearance-none bg-transparent" />
          <button onClick={decrement} className="shrink-0 px-2 text-md text-gray-500">-</button>
        </div>
        <button onClick={remove} type="button" className="w-7 h-7 shrink-0 flex items-center justify-center text-xs border border-red-500 text-red-500 rounded-full p-1">
          <i className="sicon-trash"></i>
        </button>
      </div>
    </motion.li>
  );
};

export default CartItem;
