"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { debounce } from "@/utils/debounce.utils";
import { Spinner } from "./Spinner";
import { getProducts } from "@/services/actions";
import { IProduct } from "@/types/product.types";


interface IProductSectionProps {
  searchQuery: string;
  selectedCategory: string;
}

const BATCH_SIZE = 8;
const DEBOUNCE_DELAY = 500;

const ProductSection: React.FC<IProductSectionProps> = ({
  searchQuery,
  selectedCategory,
}) => {
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchAllProducts = useCallback(async () => {
    setLoading(true);
    try {
      console.log("Fetching products");
      
      const fetchedProducts = await getProducts();
      console.log("Fetched products", fetchedProducts);
      
      setAllProducts(fetchedProducts);
      setProducts(fetchedProducts.slice(0, BATCH_SIZE));
      setHasMore(fetchedProducts.length > BATCH_SIZE);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const loadMoreProducts = useCallback(
    debounce(() => {
      if (loading || !hasMore) return;

      setLoading(true);
      const newIndex = products.length;
      const newProducts = allProducts.slice(newIndex, newIndex + BATCH_SIZE);

      setTimeout(() => {
        setProducts((prev) => [...prev, ...newProducts]);
        setHasMore(newIndex + BATCH_SIZE < allProducts.length);
        setLoading(false);
      }, 1000);
    }, DEBOUNCE_DELAY),
    [loading, hasMore, products, allProducts]
  );

  const filteredProducts = products.filter((product) => {
    const matchesSearchQuery = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "-1" ||
      product.categoryId.toString() === selectedCategory;
    return matchesSearchQuery && matchesCategory;
  });

  const lastProductElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreProducts();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMoreProducts]
  );

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {filteredProducts.map((product, index) => {
          if (filteredProducts.length === index + 1) {
            return (
              <ProductCard
                ref={lastProductElementRef}
                index={index}
                key={product.id}
                {...product}
              />
            );
          } else {
            return (
              <ProductCard key={product.id} index={index % 8} {...product} />
            );
          }
        })}
        {filteredProducts.length === 0 && (
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="col-span-full text-center text-2xl text-gray-500"
          >
            لا توجد منتجات مطابقة
          </motion.h2>
        )}
      </div>
      {loading && (
        <div className="flex items-center justify-center w-full p-4">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default ProductSection;
