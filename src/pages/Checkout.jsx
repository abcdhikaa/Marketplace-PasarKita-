import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";
import { currentUser } from "../data/ordersdata";

export default function Checkout() {
  const { addOrder } = useOrders();

  const {
    cart,
    updateQuantity,
    removeFromCart,
    checkoutMode,
    checkoutItems,
    clearCheckout,
    clearCart,
  } = useCart();
  const navigate = useNavigate();

  const items = checkoutItems ?? cart;

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    items.forEach((item, index) => {
      addOrder({
        id: Date.now() + index,
        item: item.name,
        image: item.image,
        customer: currentUser.name,
        price: item.price,
        order_date: new Date().toLocaleDateString("id-ID"),
        total: item.price * item.quantity,
        quantity: item.quantity,
        status: "New Order",
      });
    });

    navigate("/confirm");
    const fromCart = checkoutMode !== "buyNow";
    if (fromCart) clearCart();
    clearCheckout();
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto flex flex-1 flex-col items-center justify-center gap-3 px-6">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-serif">Your cart is empty</h1>
          <p>Add some products to your cart first.</p>
        </div>
        <div>
          <Link
            to="/"
            className="inline-block rounded-lg bg-[#B85C38] px-6 py-2 text-white"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <Link to="/" className="text-sm text-gray-500">
        ← Continue shopping
      </Link>
      <p className="text-sm text-[#B85C38] font-semibold mt-6">
        YOUR SELECTION
      </p>
      <div className="flex justify-between items-end">
        <h1 className="text-3xl font-serif">Shopping Cart</h1>
        <span>{items.reduce((s, i) => s + i.quantity, 0)} items</span>
      </div>
      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-[#ddd5c8] bg-white rounded-xl px-3 py-3 flex gap-3"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-24 shrink-0 rounded-lg object-cover"
              />
              <div className="w-full">
                <div className="flex justify-between items-end">
                  <p className="text-[#B85C38] text-xs">{item.store}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className=""
                    aria-label="Remove"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
                <p className="font-serif text-lg">{item.name}</p>
                <p className="text-xs text-gray-500">
                  Made to order · Ships in 3–5 days
                </p>
                <div className="flex justify-between mt-3">
                  <div className="border border-[#ddd5c8] rounded-lg flex w-fit items-center gap-0">
                    <button
                      disabled={item.quantity === 1}
                      onClick={() => updateQuantity(item.id, -1)}
                      className="text-center hover:bg-[#ddd5c8] hover:rounded-l-md h-6 w-6"
                    >
                      -
                    </button>
                    <span className="text-xs text-center w-6">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="text-center hover:bg-[#ddd5c8] hover:rounded-r-md h-6 w-6"
                    >
                      +
                    </button>
                  </div>
                  <p>
                    Rp{(item.price * item.quantity).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg border border-[#ddd5c8] py-4 px-4 self-start">
          <h2 className="mb-4 font-serif text-xl">Order Summary</h2>
          <div className="flex flex-col gap-1 border-b border-[#ddd5c8] pb-4">
            <div className="flex justify-between text-sm text-gray-800">
              <span>Subtotal</span>
              <span>Rp{subtotal.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-800">
              <span>Shipping</span>
              <span>
                {shipping === 0
                  ? "Free"
                  : `Rp${shipping.toLocaleString("id-ID")}`}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              Taxes calculated at checkout
            </span>
          </div>
          <div className="flex flex-col gap-3 border-b border-[#ddd5c8] py-4">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>Rp{total.toLocaleString("id-ID")}</span>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-[#B85C38] rounded-lg py-2 text-white"
            >
              Secure Checkout
            </button>
            <p className="flex items-center text-xs justify-center text-gray-500">
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
                class="lucide lucide-lock-keyhole preview-icon"
              >
                <circle cx="12" cy="16" r="1" />
                <rect x="3" y="10" width="18" height="12" rx="2" />
                <path d="M7 10V7a5 5 0 0 1 10 0v3" />
              </svg>
              Encrypted and secure payment
            </p>
          </div>
          <div className="flex flex-col gap-2 py-3">
            <span className="text-sm font-semibold">Have a promo code?</span>
            <div className="flex justify-between gap-3">
              <input
                placeholder="Enter code"
                className="flex-1 border border-[#ddd5c8] rounded-md px-2 py-1"
              />
              <button className="bg-[#B85C38] rounded-md px-3 py-1 text-xs text-white">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
