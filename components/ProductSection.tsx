"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import ProductCard from "./ProductCard";
import { debounce } from "@/utils/debounce.utils";
import { Spinner } from "./Spinner";
import { getProducts } from "@/services/actions";

interface Product {
  id: number;
  name: string;
  description: string;
  imageURL: string;
  price: number;
}

const BATCH_SIZE = 8;
const DEBOUNCE_DELAY = 500;

const ProductSection: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchAllProducts = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedProducts = await getProducts();
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
        {products.map((product, index) => {
          if (products.length === index + 1) {
            return (
              <ProductCard
                ref={lastProductElementRef}
                key={product.id}
                {...product}
              />
            );
          } else {
            return <ProductCard key={product.id} {...product} />;
          }
        })}
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
