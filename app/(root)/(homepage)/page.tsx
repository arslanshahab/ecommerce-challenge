"use client";
import { useState } from "react";
import ProductSection from "@/components/ProductSection";
import SearchFilter from "@/components/SearchFilter";
import Slider from "@/components/Slider";

const images = [
  "/assets/main-slider/01.png",
  "/assets/main-slider/02.png",
  "/assets/main-slider/03.png",
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("-1");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (category: string) => {
    setSelectedCategory(category);
  };
  return (
    <>
      <main className="w-full main flex-auto flex justify-center">
        <div className="container bg-white">
          <div className="p-2 sm:p-4 bg-white rounded-lg shadow-4xl">
            <Slider images={images} />
            <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />
          </div>
          <ProductSection
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />
        </div>
      </main>
    </>
  );
}
