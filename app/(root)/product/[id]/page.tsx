"use client";
import React, { useContext } from "react";
import CartItem from "@/components/CartItem";
import { useCart } from "@/contexts/CartContext"; // Ensure CartContext is correctly defined
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { validateImageSource } from "@/utils/helpers.utils";
import { IProduct } from "@/types/product.types";

const ProductDetail = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = React.useState(1);

  const { item } = searchParams;
  const product: IProduct = JSON.parse(item as string);

  const handleAddToCart = () => {
    addItem(product.id, quantity);
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  return (
    <main className="w-full main flex-auto">
      <div className="container mx-auto">
        <div className="p-2 sm:p-4 bg-white rounded-lg shadow-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-4">
            <Image
              src={
                product.imageURL && validateImageSource(product.imageURL)
                  ? product.imageURL
                  : "/assets/main-slider/01.png"
              }
              width={500}
              height={500}
              alt="product"
              className=" rounded-lg mb-8 sm:mb-0"
            />
            <div className="flex flex-col gap-4 col-span-2 justify-between">
              <article className="text-sm text-darker-300 leading-[1.8] ">
                <div className="flx flex-col mb-6 gap-2">
                  <h1 className="text-xl md:text-3xl">{product?.name}</h1>
                  <small className="text-xs text-gray-500">
                    الاصدار الاحدث و الافضل حتى اليوم
                  </small>
                </div>
                <div className="flex flex-col sm:flex-row w-full my-4 gap-0 sm:gap-2">
                  <span className="font-medium text-md">2,250.00 SAR</span>
                  <span className="font-medium text-sm line-through text-gray-300">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "SAR",
                    }).format(product?.price || 0)}
                  </span>
                </div>
                <p>{product?.description}</p>
              </article>
              <div className="flex items-center justify-center gap-4">
                <div className="flex shrink-0 items-center justify-center p-2 border border-1 border-gray-200 rounded-lg">
                  <button
                    className="shrink-0 px-2 text-md text-gray-500"
                    onClick={incrementQuantity}
                  >
                    +
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    className="w-[50px] flex-1 text-center appearance-none bg-transparent"
                    onChange={handleQuantityChange}
                  />
                  <button
                    className="shrink-0 px-2 text-md text-gray-500"
                    onClick={decrementQuantity}
                  >
                    -
                  </button>
                </div>
                <button
                  type="button"
                  className="w-full h-[42px] bg-primary text-white flex-1 p-2 text-md rounded-md"
                  onClick={handleAddToCart}
                >
                  إضافة للسلة
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
