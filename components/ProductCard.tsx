import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { validateImageSource } from "@/utils/helpers.utils";
import Image from "next/image";
import Link from "next/link";

interface IProductCardProps {
  id: number;
  name: string;
  description: string;
  imageURL: string;
  price: number;
  index: number;
}

const ProductCard = forwardRef<HTMLDivElement, IProductCardProps>(
  ({ id, name, description, imageURL, price, index }, ref) => {
    const { addItem } = useCart();

    const data = JSON.stringify({ description, id, imageURL, name, price });

    const handleAddToCart = () => {
      addItem(id, 1);
    };

    return (
      <motion.div
        ref={ref}
        className="rounded-lg border-2 border-gray-50 flex flex-col items-start justify-start md:p-3 p-2 relative"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        transition={{
          duration: 0.5,
          delay: index * 0.125,
          ease: "easeInOut",
        }}
        viewport={{ amount: 0 }}
        whileHover={{
          scale: 1.01,
          transition: {
            type: "spring",
            stiffness: 260,
            damping: 10,
            duration: 0.125,
          },
        }}
      >
        <Link
          // being done as we have no api to fetch product details
          // @FIXME: need to find better approach
          href={`/product/${id}?item=${data}`}
          className="block w-full aspect-4/3 relative mb-4"
        >
          <Image
            src={
              imageURL && validateImageSource(imageURL)
                ? imageURL
                : "/assets/main-slider/01.png"
            }
            className="w-full aspect-4/3 object-cover rounded-lg"
            fill
            alt="product"
          />
        </Link>
        <div className="w-full flex flex-col flex-1 items-start justify-start gap-4">
          <div className="flex items-center justify-center flex-col gap-1 w-full">
            <a href="#" className="block w-full text-primary text-center">
              <h2 className="text-sm text-center">
                {name.length > 30 ? `${name.slice(0, 30)}...` : name}
              </h2>
            </a>
            <small className="block text-xs w-full text-center">
              {description.length > 50
                ? `${description.slice(0, 50)}...`
                : description}
            </small>
          </div>
          <div className="flex items-center justify-center flex-wrap gap-2 text-gray-300 w-full">
            <a className="text-xs text-gray-500 underline" href="#">
              تصنيف اول
            </a>
            <a className="text-xs text-gray-500 underline" href="#">
              تصنيف ثاني
            </a>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center w-full mb-4 gap-0 sm:gap-2">
          <span className="font-medium text-md">{price} SAR</span>
          <span className="font-medium text-sm line-through text-gray-300">
            {price} SAR
          </span>
        </div>
        <motion.button
          type="button"
          className="w-full bg-primary text-white p-2 text-md rounded-md"
          onClick={handleAddToCart}
          whileHover={{
            scale: 1.03,
            transition: {
              type: "spring",
              stiffness: 260,
              damping: 10,
              duration: 0.125,
            },
          }}
        >
          إضافة للسلة
        </motion.button>
      </motion.div>
    );
  }
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
