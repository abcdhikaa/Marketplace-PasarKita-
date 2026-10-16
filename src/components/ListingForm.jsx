import { useState } from "react";
import { categories, shopProfile } from "../data/ordersdata";

export default function ListingForm({ onClose, onSave, initialData }) {
  const [form, setForm] = useState(
    initialData
      ? {
          name: initialData.name,
          category: initialData.category,
          price: String(initialData.price),
          stock: String(initialData.stock),
          description: initialData.description || "",
          detail: initialData.detail || "",
          careInstruction: initialData.careInstruction || "",
        }
      : {
          name: "",
          category: "",
          price: "",
          stock: "",
          description: "",
          detail: "",
          careInstruction: "",
        },
  );

  const [images, setImages] = useState([]);
  const MAX_IMAGES = 4;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => {
      const remaining = MAX_IMAGES - prev.length;
      return [...prev, ...files.slice(0, remaining)];
    });
    e.target.value = "";
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.category || !form.price) {
      alert("Please fill all required information!");
      return;
    }

    const product = {
      id: initialData ? initialData.id : Date.now(),
      name: form.name,
      store: shopProfile.name, 
      shopId: shopProfile.id, 
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock) || 0,
      sold: initialData ? initialData.sold : 0,
      rating: initialData?.rating ?? 0, 
      image: images[0] ? URL.createObjectURL(images[0]) : initialData?.image,
      images: images.length > 0 
        ? images.map((f) => URL.createObjectURL(f))
        : (initialData?.images ?? []),
      description: form.description,
      detail: form.detail,
      careInstruction: form.careInstruction,
      reviewSummary: initialData?.reviewSummary ?? null, 
      reviews: initialData?.reviews ?? [], 
    };

    onSave(product);
    onClose();
  };

  const [text, setText] = useState("");
  const maxChars = {
    name: 80,
    description: 1000,
  };

  const PRICE_MIN = 100;
  const PRICE_MAX = 999_999_999;

  const QUANTITY_MIN = 1;
  const QUANTITY_MAX = 99999;

  const [category, setCategory] = useState("");

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-10 backdrop-blur-xs"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-md md:max-w-3xl overflow-y-auto rounded-xl bg-white px-6 pb-6 flex flex-col gap-3"
      >
        <div className="sticky top-0 -mx-6 flex items-center justify-between border-b bg-white px-6 py-4">
          <div>
            <h2 className="font-serif text-xl font-semibold">
              New Listing Product
            </h2>
            <p className="text-xs text-gray-700">List your product here</p>
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
        <div>
          <p className="text-sm font-semibold">PRODUCT NAME *</p>
          <input
            name="name"
            value={form.name}
            type="text"
            placeholder="e.g. Macbook Pro"
            className="w-full rounded-lg border border-gray-300 p-1 text-sm"
            maxLength={maxChars.name}
            onChange={handleChange}
          />
          <p className="flex justify-end text-xs text-gray-700">
            {form.name.length}/{maxChars.name}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">CATEGORY</p>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-1 text-sm"
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="text-sm font-semibold">PRICE</p>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-1 text-sm"
            min={PRICE_MIN}
            max={PRICE_MAX}
            placeholder="e.g. 250000"
          />
        </div>
        <div>
          <p className="text-sm font-semibold">STOCK</p>
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            min={QUANTITY_MIN}
            max={QUANTITY_MAX}
            placeholder="Quantity Product"
            className="w-full rounded-lg border border-gray-300 p-1 text-sm"
          />
        </div>
        <div>
          <p className="text-sm font-semibold">DESCRIPTION</p>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-1 text-sm"
            placeholder="Describe your product"
            maxLength={maxChars.description}
          />
          <p className="flex justify-end text-xs text-gray-700">
            {form.description.length}/{maxChars.description}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">DETAILS & HIGHLIGHT</p>
          <textarea
            name="detail"
            value={form.detail}
            onChange={handleChange}
            rows={2}
            className="w-full rounded-lg border border-gray-300 p-1 text-sm"
            placeholder="Detail Product"
            maxLength={maxChars.description}
          />
          <p className="flex justify-end text-xs text-gray-700">
            {form.detail.length}/{maxChars.description}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">CARE INSTRUCTION</p>
          <textarea
            name="careInstruction"
            value={form.careInstruction}
            onChange={handleChange}
            rows={2}
            className="w-full rounded-lg border border-gray-300 p-1 text-sm"
            placeholder="Care instruction product"
            maxLength={maxChars.description}
          />
          <p className="flex justify-end text-xs text-gray-700">
            {form.careInstruction.length}/{maxChars.description}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">PRODUCT IMAGES</p>
          {images.length > 0 && (
            <div className="mb-2 grid grid-cols-4 gap-2">
              {images.map((file, i) => (
                <div key={i} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview ${i + 1}`}
                    className="h-20 w-full rounded-lg border object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white"
                  >
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
              ))}
            </div>
          )}

          <label className="flex h-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-700 hover:bg-gray-100">
            + Upload Images
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          <p className="flex justify-end text-xs text-gray-700">
            {images.length}/{MAX_IMAGES}
          </p>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-red-400 text-white text-xs md:text-sm p-1.5 hover:bg-red-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-green-500 text-white text-xs md:text-sm p-1.5 hover:bg-green-700"
          >
            Add Listing
          </button>
        </div>
      </form>
    </div>
  );
}
