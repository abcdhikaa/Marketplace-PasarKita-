import cartIcon from "../assets/icons/shopping-cart.png";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import AccordionItem from "../components/AccordionItem";
import ReviewSection from "../components/ReviewSummary";
import { products } from "../data/ordersdata";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, buyNow } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = products.find((product) => product.id === Number(id));

  if (!product) {
    return (
      <div className="mx-auto flex flex-1 flex-col items-center justify-center gap-3 px-6">
        <h1 className="text-2xl font-serif">Produk tidak ditemukan</h1>
        <Link to="/" className="rounded-lg bg-[#B85C38] px-6 py-2 text-white">
          Kembali
        </Link>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [product.image];

  const sections = [
    { title: "Description", content: product.description },
    { title: "Details & Highlight", content: product.detail },
    { title: "Care Instruction", content: product.careInstruction },
  ].filter((s) => s.content);

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const increase = () => {
    setQuantity(quantity + 1);
  };

  const totalPrice = product.price * quantity;

  return (
    <>
      <div className="max-w-7xl w-full mx-auto px-6 py-6 flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-1/2">
          <nav className="flex items-center gap-3">
            <Link to="/" className="text-gray-500 hover:text-gray-800">
              Browse
            </Link>
            <span>/</span>
            <span>{product.category}</span>
            <span>/</span>
            <span>{product.name}</span>
          </nav>
          <div className="w-full">
            <div className="w-full aspect-square overflow-hidden rounded-2xl">
              <img
                src={images[selectedImage] || images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto py-3">
                {images.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    aria-label={`View image ${index + 1}`}
                    aria-pressed={selectedImage === index}
                    className={`w-16 h-16 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                      selectedImage === index
                        ? "border-[#B85C38]"
                        : "border-[#ddd5c8] hover:border-[#b9ad9b]"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-5 flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <p className="text-gray-500 text-sm">{product.category}</p>
            <p className="text-3xl font-serif font-semibold">{product.name}</p>
            <p className="text-lg text-[#B85C38]">by {product.store}</p>
            <p>★ {product.rating}</p>
            <p className="text-2xl font-bold">
              Rp{product.price.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="flex flex-col gap-1 items-center self-start">
            <p className="text-xs">QUANTITY</p>
            <div className="flex items-center gap-5">
              <button
                onClick={decrease}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-800 transition hover:border-[#B85C38] hover:text-[#B85C38] disabled:opacity-50 disabled:pointer-events-none"
                disabled={quantity === 1}
              >
                -
              </button>
              <span className="w-3 text-center text-sm font-medium">
                {quantity}
              </span>
              <button
                onClick={increase}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-800 transition hover:border-[#B85C38] hover:text-[#B85C38]"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between gap-3">
            <button
              onClick={() => {
                buyNow(product, quantity);
                navigate("/checkout");
              }}
              className="flex-1 rounded-xl bg-[#B85C38] text-white font-bold hover:shadow-md hover:brightness-90"
            >
              Buy Now - Rp{totalPrice.toLocaleString("id-ID")}
            </button>
            <button
              onClick={() => addToCart(product, quantity)}
              className="flex h-11 w-12 items-center justify-center rounded-xl bg-white hover:shadow-md hover:brightness-90"
            >
              <img src={cartIcon} alt="Cart" className="h-5 w-5" />
            </button>
          </div>
          <div className="w-full bg-white p-5 rounded-xl">
            <p>Free shipping on orders over $50</p>
            <p>Ships in 3–5 business days</p>
            <p>30-day returns on unused items</p>
          </div>
          <div>
            <AccordionItem sections={sections} />
          </div>
        </div>
      </div>

      <ReviewSection
        {...product.reviewSummary}
        reviews={product.reviews ?? []}
      />
    </>
  );
}

export default ProductDetail;
