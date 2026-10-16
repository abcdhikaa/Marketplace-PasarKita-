import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartDropdown() {
  const { cart, removeFromCart, updateQuantity, checkoutCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="absolute right-0 mt-2 w-100 rounded-xl border border-[#ddd5c8] bg-white p-4 shadow-lg">
      <p className="text-xl font-semibold mb-3">Your Cart</p>
      {cart.length === 0 ? (
        <div className="w-full flex items-center justify-center">
          <p className="font-semibold">Cart is empty</p>
        </div>
      ) : (
        <>
          <div className="">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between p-1 mt-1 bg-[#FAF7F2] rounded-lg"
              >
                <div className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-18 w-18 shrink-0 rounded-lg object-cover bg-white"
                  />
                  <div>
                    <p className="text-[11px] text-gray-500">{item.store}</p>
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-xs">Rp{(item.price * item.quantity).toLocaleString("id-ID")}</p>
                    <div className="flex items-center gap-2 my-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="h-4 w-4 rounded border text-xs flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="text-xs flex items-center justify-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="h-4 w-4 rounded border text-xs flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-xs text-red-500 self-end"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-x preview-icon"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="mb-2 flex justify-between">
              <span className="font-semibold">Total</span>
              <span>Rp{totalPrice.toLocaleString("id-ID")}</span>
            </div>
            <button
              onClick={() => {
                checkoutCart();
                navigate("/checkout");
              }}
              className="w-full rounded-lg bg-[#B85C38] py-2 text-xs text-white"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
