import { useState } from "react";
import Search from "../components/Search";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import { products } from "../data/ordersdata";


function Home() {
  const browseCategories = [
    "Electronics",
    "Fashion",
    "Automotive",
    "Pet Supplies",
    "Health & Beauty",
    "Digital Products",
  ];

  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredButtons = ["Semua", ...browseCategories];

  const filteredProducts =
    selectedCategory === "Semua"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <section className="px-6 py-10 md:py-20 flex flex-col gap-2 md:gap-4 items-center justify-center bg-[#EDE8DF]">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Cari sesuatu sesuai kebutuhanmu
        </h1>
        <p className="text-lg md:text-2xl text-center text-[#78716C]">
          Cari ribuan barang dari penjualnya langsung
        </p>
        <Search />
      </section>
      <section className=" bg-[#EDE8DF]">
        <section className="px-6 py-8">
          <section className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-center max-w-7xl mx-auto">
            <CategoryFilter
              categories={filteredButtons}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <div className="flex items-center gap-2 text-xs md:text-base">
              <span className="whitespace-nowrap text-gray-600">
                {`${filteredProducts.length} results`}
              </span>
              <select className="border border-gray-300 rounded-lg px-4 py-2 bg-[#B85C38] text-white">
                <option className="bg-white text-black">Popular</option>
                <option className="bg-white text-black">Newest</option>
                <option className="bg-white text-black">Price: Low to High</option>
                <option className="bg-white text-black">Price: High to Low</option>
              </select>
            </div>
          </section>
        </section>
        <section className="w-full px-6 pb-10 bg-[#EDE8DF]">
          {filteredProducts.length === 0 ? (
            <div className="mx-auto max-w-7xl flex flex-col items-center justify-center">
              <p>No products found.</p>
              <p>No products for this category "{selectedCategory}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto ">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </section>
    </div>
  );
}

export default Home;
