import { useState } from "react";

function CategoryFilter({ categories, selectedCategory, setSelectedCategory }) {
  return (
      <div className="flex gap-1 w-full justify-start overflow-x-scroll no-scrollbar">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-full border text-[10px] md:text-xs text-nowrap ${
              selectedCategory === category
                ? "bg-[#B85C38] text-white border-[#B85C38]"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
  );
}

export default CategoryFilter;
