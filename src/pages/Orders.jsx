import { useState } from "react";
import Pagination from "../components/Pagination";
import { useOutletContext } from "react-router-dom";

function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const { selected, setSelected, ordersStatus: orders } = useOutletContext();

  const itemPerPage = 10;
  const totalPage = Math.ceil(orders.length / itemPerPage);

  const startIndex = (currentPage - 1) * itemPerPage;

  const currentOrders = orders.slice(startIndex, startIndex + itemPerPage);

  const selectableOrders = orders.filter((o) => o.status === "New Order");

  const allChecked =
    selectableOrders.length > 0 &&
    selectableOrders.every((o) => selected.includes(o.id));

  const toggleAll = () => {
    if (allChecked) {
      setSelected([]);
    } else {
      setSelected(selectableOrders.map((o) => o.id));
    }
  };

  const toggleOne = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 w-full">
      <div className="border border-[#ddd5c8] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="text-xs sm:text-base">
              <tr className="bg-[#F8F6F2] ">
                <th className="text-center px-2 sm:px-4 py-3 w-[7%]">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAll}
                    className="h-4 w-4 align-middle accent-[#B85C38]"
                  />
                </th>
                <th className="text-left px-2 sm:px-4 py-3 w-[35%]">Order</th>
                <th className="text-center px-2 sm:px-4 py-3 w-[20%]">
                  Customer
                </th>
                <th className="text-center px-2 sm:px-4 py-3 w-[10%] hidden md:block">
                  Quantity
                </th>
                <th className="text-center px-2 sm:px-4 py-3 w-[20%]">Total</th>
                <th className="text-center px-2 sm:px-4 py-3 w-[20%]">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="bg-white text-xs md:text-base">
              {currentOrders.map((order) => {
                const selectable = order.status === "New Order";

                return (
                  <tr
                    key={order.id}
                    className={`border-t border-[#e5dfd5] ${
                      order.status === "Delivered"
                        ? "bg-gray-50 opacity-50"
                        : ""
                    }`}
                  >
                    <td className="text-center">
                      <input
                        type="checkbox"
                        checked={selected.includes(order.id)}
                        onChange={() => toggleOne(order.id)}
                        disabled={!selectable}
                        className="h-4 w-4 align-middle accent-[#B85C38]"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex flex-col md:flex-row items-center gap-3">
                        <img src={order.image} className="h-10 w-10" />
                        <div>
                          <p className="font-bold text-sm">#{order.id}</p>
                          <p className="text-sm">{order.item}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <p>{order.customer}</p>
                      <p>{order.order_date}</p>
                    </td>
                    <td className="text-center hidden md:table-cell">
                      {order.quantity}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span>
                        <span className="md:hidden flex flex-col"> 
                          <span>Quantity : {order.quantity}</span>
                          <span className="">Rp{order.total.toLocaleString("id-ID")}</span>
                        </span>
                        <span className="hidden md:inline">Rp{order.total.toLocaleString("id-ID")}</span>
                        
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-[10px] md:text-xs ${
                          order.status === "New Order"
                            ? "bg-yellow-200 text-yellow-600"
                            : order.status === "Shipped"
                              ? "bg-blue-200 text-blue-600"
                              : "bg-green-200 text-green-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
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

export default Orders;
