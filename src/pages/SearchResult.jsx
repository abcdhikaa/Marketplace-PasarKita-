import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Search from "../components/Search";
import ProductCard from "../components/ProductCard";
import { products } from "../data/ordersdata";

export default function SearchResults() {
  const [params] = useSearchParams();
  const q = params.get("q") ?? "";
  const [sort, setSort] = useState("Popular");

  const results = products.filter((p) =>
    p.name.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row justify-start md:justify-between items-center gap-3 md:gap-2">
        <div className="flex-1 w-full">
          <Search />
        </div>
        <div className="flex w-full md:w-fit items-center gap-3 self-end justify-between md:justify-end">
          <p className="text-gray-600">
            {results.length} results for "{q}"
          </p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-[#B85C38] text-white"
          >
            <option className="bg-white text-black">Popular</option>
            <option className="bg-white text-black">Newest</option>
            <option className="bg-white text-black">Price: Low to High</option>
            <option className="bg-white text-black">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="mt-6">
        {results.length === 0 ? (
          <p className="text-center">No products found</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
