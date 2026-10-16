import { useNavigate, Link } from "react-router-dom";
import { currentUser } from "../data/ordersdata";

export default function ProfileDropdown() {
  return (
    <div className="absolute right-0 w-80 rounded-xl border border-[#ddd5c8] bg-white shadow-lg flex flex-col">
      <div className="flex items-center border-b border-[#ddd5c8] py-3 px-3 gap-1.5">
        <img src={currentUser.avatar} alt="profile" className="h-12 w-12" />
        <div>
          <p className="font-semibold">{currentUser.name}</p>
          <p className="text-xs text-gray-700">{currentUser.email}</p>
        </div>
      </div>
      <div className="text-sm flex flex-col gap-1 my-2 mx-3">
        <Link
          to="/my-shop"
          className="flex items-center gap-2 text-gray-800 hover:bg-[#ddd5c8] w-full py-2 px-2 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-house preview-icon"
          >
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
          My Shop
        </Link>
        <Link
          to="/my-orders"
          className="flex items-center gap-2 text-gray-800 hover:bg-[#ddd5c8] w-full py-2 px-2 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-shopping-cart preview-icon"
          >
            <path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18" />
            <path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25" />
            <circle cx="18" cy="20" r="2" />
            <circle cx="8" cy="20" r="2" />
          </svg>
          My Orders
        </Link>
        <span className="flex items-center gap-2 text-gray-800 hover:bg-[#ddd5c8] w-full py-2 px-2 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-square-pen preview-icon"
          >
            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
          </svg>
          Edit Profile
        </span>
      </div>
      <div className="py-2 px-3 border-t border-[#ddd5c8]">
        <span className="flex text-sm items-center gap-2 text-gray-600 hover:bg-red-400 hover:text-white w-full py-2 px-2 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-log-out preview-icon"
          >
            <path d="m16 17 5-5-5-5" />
            <path d="M21 12H9" />
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          </svg>
          Sign out
        </span>
      </div>
    </div>
  );
}
