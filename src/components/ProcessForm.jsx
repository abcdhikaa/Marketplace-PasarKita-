import { useState } from "react";
import Pagination from "./Pagination";

export default function ProcessForm({ orders, onClose, onSuccess }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess();
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 10;
  const totalPage = Math.ceil(orders.length / itemPerPage);

  const startIndex = (currentPage - 1) * itemPerPage;

  const currentSelected = orders.slice(startIndex, startIndex + itemPerPage);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-10 backdrop-blur-xs"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="max-h-[90vh] w-full max-w-md md:max-w-3xl overflow-y-auto rounded-xl px-6 pb-6 bg-[#F8F6F2] flex flex-col gap-4"
      >
        <div className="sticky top-0 -mx-6 flex justify-between shadow-sm px-6 py-4 bg-[#EDE8DF]">
          <div className="">
            <h2 className="text-xl font-serif">Process Orders</h2>
            <p className="text-sm text-gray-600">{orders.length} orders selected</p>
          </div>
          <button onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-x preview-icon"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div className="">
          {currentSelected.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between gap-5 border rounded-lg my-2 p-1 bg-white"
            >
              <span className="font-serif text-xl">#{order.id}</span>
              <div className="flex flex-col">
                <span className="font-semibold">
                  {order.item}
                </span>
                <span className="text-sm text-gray-700">
                  {order.customer} | {order.order_date}
                </span>
              </div>
              <div className="flex flex-1 justify-end items-center gap-4">
                <span className="rounded-full px-2 py-1 bg-yellow-200 text-yellow-600 text-xs">
                  New Order
                </span>
                <span className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-move-right preview-icon"
                  >
                    <path d="M18 8L22 12L18 16" />
                    <path d="M2 12H22" />
                  </svg>
                </span>
                <span className="rounded-full px-2 py-1 bg-blue-200 text-blue-600 text-xs">
                  Shipped
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="-mx-4 -mt-5">
          <Pagination
          currentPage={currentPage}
          totalPages={totalPage}
          onPageChange={setCurrentPage}
        />
        </div>
        
        <div className="flex justify-end bg-[#EDE8DF] -mx-6 -mb-6 px-6 py-4">
          <button
            type="submit"
            className="rounded-lg bg-green-500 text-white px-4 py-2 hover:bg-green-700"
          >
            Confirm Process ({orders.length})
          </button>
        </div>
      </form>
    </div>
  );
}
