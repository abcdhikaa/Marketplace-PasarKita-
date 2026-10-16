import { Link } from "react-router-dom";
import { useOrders } from "../context/OrdersContext";
import { currentUser } from "../data/ordersdata";

export default function MyOrders() {
  const { orders, confirmDelivered } = useOrders();
  const myOrders = orders.filter((o) => o.customer === currentUser.name);

  const badge = (status) =>
    status === "New Order"
      ? "bg-yellow-200 text-yellow-600"
      : status === "Shipped"
        ? "bg-blue-200 text-blue-600"
        : "bg-green-200 text-green-600";

  if (myOrders.length === 0) {
    return (
      <div className="mx-auto flex flex-1 flex-col items-center justify-center">
        <h1>No orders you have made </h1>
        <Link to="/" className="rounded-lg bg-[#B85C38] px-6 py-2 text-white">
          Continue Browsing
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 flex flex-col gap-3">
      <h1 className="text-3xl font-serif">My Orders</h1>
      <div className="flex flex-col gap-3">
        {myOrders.map((order) => (
          <div
            key={order.id}
            className="flex justify-between rounded-lg bg-white p-3 gap-2"
          >
            <div className="flex items-center gap-3">
              <img 
                src={order.image}
                alt="orderImage"
                className="h-20 w-20 rounded-lg"
              />
              <div>
                <p className="">#{order.id}</p>
                <p className="font-semibold  text-sm md:text-xl">{order.item}</p>
                <p className="text-sm md:text-base">Quantity : {order.quantity}</p>
                <p className="text-sm md:text-base">
                  {order.order_date} - Rp{order.total.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between items-end">
              <span
                className={`rounded-full px-3 py-1 text-sm ${badge(order.status)}`}
              >
                {order.status}
              </span>
              {order.status === "Shipped" && (
                <button
                  onClick={() => confirmDelivered(order.id)}
                  className="rounded-lg bg-[#B85C38] px-2 py-2 text-xs text-white hover:opacity-90"
                >
                  Confirm Order
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
