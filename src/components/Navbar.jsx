import { useState, useRef, useEffect } from "react";
import cartIcon from "../assets/icons/shopping-cart.png";
import profileIcon from "../assets/icons/female-avatar.png";
import { Link, useLocation } from "react-router-dom";
import CartDropdown from "./CartDropdown";
import { useCart } from "../context/CartContext";
import ProfileDropdown from "./ProfileDropdown";
import { currentUser } from "../data/ordersdata";

function Navbar() {
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const cartRef = useRef(null);
  const profileRef = useRef(null);

  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setShowCart(false);
      }

      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const location = useLocation();
  useEffect(() => {
    setShowCart(false);
    setShowProfile(false);
  }, [location.pathname]);

  return (
    <nav className="bg-[#FAF7F2] shadow-md sticky top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 md:py-4 flex items-center justify-between">
        <div className="flex gap-3 md:gap-6 items-center">
          <h1 className="text-lg md:text-2xl font-bold text-black">
            PasarKita
          </h1>
          <div className="hidden md:flex gap-6 items-center">
            <Link
              to="/"
              className="text-xs md:text-base text-gray-700 hover:text-[#B85C38]"
            >
              Browse
            </Link>

            <Link
              to="/my-shop"
              className="text-xs md:text-base text-gray-700 hover:text-[#B85C38]"
            >
              My Shop
            </Link>
            <Link
              to="/my-orders"
              className="text-xs md:text-base text-gray-700 hover:text-[#B85C38]"
            >
              My Orders
            </Link>
          </div>
          <div className="flex md:hidden">
            <Link
              to="/"
              className="text-sm text-gray-700 hover:text-[#B85C38]"
            >
              Browse
            </Link>
          </div>
        </div>
        <div className="flex gap-4 md:gap-6 items-center justify-center">
          <div className="relative" ref={cartRef}>
            <button onClick={() => setShowCart(!showCart)} className="relative">
              <img src={cartIcon} alt="Cart" className="w-6.5 h-6.5" />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#B85C38] text-[10px] text-white">
                  {totalItems}
                </span>
              )}
            </button>
            {showCart && <CartDropdown />}
          </div>
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="relative"
            >
              <img
                src={currentUser.avatar}
                alt="Profile"
                className="w-10 h-10"
              />
            </button>
            {showProfile && <ProfileDropdown />}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
