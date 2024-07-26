"use client";
import React, { useState, useEffect } from "react";
import { categoryApi, ICategory } from "@/services/category";

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilter: (category: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch, onFilter }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryApi.getCategories();
        /**
         * filter out any empty categories from the list
         * and pick only the first 10 categories
         * and prepend an "all" category
         */
        const filteredCategories = data
          .filter(
            (category) =>
              category.categoryName !== "" && category.categoryName !== null
          )
          .slice(0, 10);
        setCategories([
          { id: -1, categoryName: "الكل", imageUrl: "", products: [] },
          ...filteredCategories,
        ]);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
    onFilter(event.target.value);
  };

  return (
    <div className="flex items-center justify-between gap-4 my-4">
      <div className="flex flex-col gap-1 flex-1">
        <label htmlFor="product_query" className="hidden">
          ابحث عن منتج
        </label>
        <input
          type="text"
          id="product_query"
          name="product_query"
          className="w-full p-2 bg-white appearance-none rounded-md border text-md"
          placeholder="ادخل اسم المنتج..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex flex-col gap-1 shrink-0 max-w-[33%] sm:min-w-[180px]">
        <label htmlFor="categories" className="hidden">
          اختر تصنيف
        </label>
        <select
          id="categories"
          name="categories"
          className="bg-white border text-md rounded-md focus:ring-secondary-50 focus:border-secondary-50 block w-full px-2 py-2"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;
