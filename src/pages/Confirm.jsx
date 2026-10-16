import { Link } from "react-router-dom";

export default function Confirm() {
  return (
    <div className="mx-auto flex flex-col flex-1 items-center justify-center gap-3">
      <div className="rounded-full bg-green-200 p-4 text-green-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-check preview-icon"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>
      <p className="font-semibold text-[#B85C38]">ORDER CONFIRMED</p>
      <h1 className="font-serif text-3xl">Thank you for supporting sellers</h1>
      <p className="text-sm text-gray-600">
        Your order is being prepared. We sent the receipt and shipping details
        to your email.
      </p>
      <Link
        to="/"
        className="inline-block rounded-lg bg-[#B85C38] px-6 py-2 text-white mt-3"
      >
        Continue shopping
      </Link>
    </div>
  );
}
