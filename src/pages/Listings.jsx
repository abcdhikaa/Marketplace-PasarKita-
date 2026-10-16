import { useState } from "react";
import Pagination from "../components/Pagination";
import { useOutletContext } from "react-router-dom";

function Listing() {
  const [currentPage, setCurrentPage] = useState(1);

  const { listing, setListing, openEdit, deleteListing } = useOutletContext();

  const itemPerPage = 10;
  const totalPage = Math.ceil(listing.length / itemPerPage);

  const startIndex = (currentPage - 1) * itemPerPage;

  const currentProducts = listing.slice(startIndex, startIndex + itemPerPage);

  return (
    <div className="max-w-7xl w-full mx-auto px-6 py-6 ">
      <div className="border border-[#ddd5c8] rounded-xl overflow-hidden">
        <div className=" overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="text-xs sm:text-base">
              <tr className="bg-[#F8F6F2]">
                <th className="text-left px-1 sm:px-4 py-3 w-[20%] sm:">
                  Product
                </th>
                <th className="text-left px-1 sm:px-4 py-3 w-[5%]">Category</th>
                <th className="text-left px-1 sm:px-4 py-3 w-[5%]">Price</th>
                <th className="text-left px-1 sm:px-4 py-3 w-[5%]">Stock</th>
                <th className="text-left px-1 sm:px-4 py-3 w-[5%]">Sold</th>
                <th className="text-center px-1 sm:px-4 py-3 w-[10%]">
                  Status
                </th>
                <th className="text-left md:text-right px-1 sm:px-4 py-3 w-[10%]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {currentProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-[#e5dfd5] bg-white hover:bg-[#F8F6F2]"
                >
                  <td className="px-2 md:px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-7.5 h-7.5 md:w-10 sm:h-10 rounded-lg object-cover shrink-0"
                      />

                      <p className="text-xs sm:text-base sm:font-medium">
                        {product.name}
                      </p>
                    </div>
                  </td>
                  <td className="px-2 md:px-4 py-3 text-xs sm:text-base">
                    {product.category}
                  </td>
                  <td className="px-2 md:px-4 py-3 text-xs sm:text-base">
                    Rp{product.price.toLocaleString("id-ID")}
                  </td>
                  <td
                    className={`px-2 md:px-4 py-3 text-xs sm:text-base ${
                      product.stock === 0
                        ? "text-red-500"
                        : product.stock <= 5
                          ? "text-orange-500"
                          : "text-gray-800"
                    }`}
                  >
                    {product.stock}
                  </td>

                  <td className="px-2 md:px-4 py-3 text-xs sm:text-base">
                    {product.sold}
                  </td>

                  <td className="px-2 md:px-4 py-3 text-center">
                    {product.stock === 0 ? (
                      <span className="inline-block px-2 md:px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] sm:text-xs">
                        <span className="md:hidden">Sold</span>
                        <span className="hidden md:inline ">Out of Stock</span>
                      </span>
                    ) : (
                      <span className="px-2 md:px-3 py-1 rounded-full bg-green-50 text-green-600 text-[10px] sm:text-xs">
                        Active
                      </span>
                    )}
                  </td>

                  <td className="px-2 md:px-4 py-3 text-center md:text-right text-xs md:text-base">
                    <button onClick={() => openEdit(product)}>✎</button>
                    <button onClick={() => deleteListing(product.id)}>
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Listing;
