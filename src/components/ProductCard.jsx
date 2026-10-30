import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import cartIcon from "../assets/icons/shopping-cart.png";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <Link
      to={`/product/${product.id}`}
      className="group border border-gray-300 rounded-xl hover:shadow-xl bg-white"
    >
      <div className="aspect-square overflow-hidden rounded-t-xl bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>
      <div className="p-2 md:p-4 space-y-0.5 md:space-y-0">
        <p className="text-[10px] md:text-xs text-gray-500">{product.store}</p>
        <h3 className="font-medium text-xs md:text-base">{product.name}</h3>
        <p className="text-sm text-gray-500">★ {product.rating}</p>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <p className="font-semibold text-xs md:text-base">
            Rp{product.price.toLocaleString("id-ID")}
          </p>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="mt-1 md:mt-0 font-medium w-full md:w-fit text-xs md:text-sm flex justify-center gap-1 text-gray-700 bg-[#FAF7F2] px-2 py-1.5 rounded-md hover:bg-[#EDE8DF] hover:text-gray-500"
          >
            Cart
            <img src={cartIcon} alt="cartIcon" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
