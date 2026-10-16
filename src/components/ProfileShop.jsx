import { useState } from "react";

function ProfileShop({ shopProfile, onEdit }) {
  return (
    <nav
      className="h-64 bg-cover bg-center"
      style={{ backgroundImage: `url(${shopProfile.banner})` }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-end justify-between p-6">
        <div className="flex gap-2">
          <img
            src={shopProfile.avatar}
            alt="Shop profile"
            className="h-12 w-12 rounded-xl border border-white"
          />
          <div>
            <h1 className="text-xl font-bold text-white">{shopProfile.name}</h1>
            <p className="text-xs text-white">
              Member since {shopProfile.regdate} • {shopProfile.city}
            </p>
          </div>
        </div>
        <button
          onClick={onEdit}
          className="h-8 rounded-xl border border-gray-300 bg-gray-200/50 p-1.5 text-xs font-bold text-white hover:bg-gray-200/70"
        >
          Edit Shop
        </button>
      </div>
    </nav>
  );
}

export function ShopForm({ shopProfile, onClose, onSave }) {
  const [form, setForm] = useState({
    name: shopProfile.name,
    regdate: shopProfile.regdate,
    city: shopProfile.city,
    avatar: shopProfile.avatar,
    banner: shopProfile.banner,
  });

  const [avatar, setAvatar] = useState(null);
  const [banner, setBanner] = useState(null);

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(file);
  };

  const handleBanner = (e) => {
    const file = e.target.files[0];
    if (file) setBanner(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.city) {
      alert("Please fill shop name and city!");
      return;
    }
    onSave({
      ...shopProfile,
      ...form,
      avatar: avatar ? URL.createObjectURL(avatar) : shopProfile.avatar,
      banner: banner ? URL.createObjectURL(banner) : shopProfile.banner,
    });
    onClose();
  };
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-md md:max-w-3xl rounded-xl bg-white p-4"
      >
        <div className="border-b border-gray-400 pb-3 -mx-4 px-4">
          <h2 className="font-serif text-xl">Update Profile Shop</h2>
        </div>
        <div className="flex flex-col gap-0.5 pt-2">
          <label className="mb-3 block text-sm">
            Shop Name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              maxLength={40}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </label>
          <label className="mb-3 block text-sm">
            Member since
            <div className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2">
              {shopProfile.regdate}
            </div>
          </label>
          <label className="mb-3 block text-sm">
            City
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              maxLength={40}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </label>
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold">Shop Profile</p>
              <label className="rounded-md text-xs py-1 px-2 flex self-start bg-[#B85C38] text-white">
                Change Avatar
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatar}
                  className="hidden"
                />
              </label>
            </div>
            <img
              src={avatar ? URL.createObjectURL(avatar) : shopProfile.avatar}
              alt="avatar"
              className="mt-1 h-18 w-18 rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold">Shop Banner</p>
              <label className="rounded-md text-xs py-1 px-2 flex self-start bg-[#B85C38] text-white">
                Change Banner
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBanner}
                  className="hidden"
                />
              </label>
            </div>

            <img
              src={banner ? URL.createObjectURL(banner) : shopProfile.banner}
              alt="banner"
              className="mt-1 h-24 w-full rounded-lg object-cover"
            />
          </div>
          <div className="flex items-center justify-between text-xs mt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-red-400 py-1 px-2 text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-green-400 py-1 px-2 text-white"
            >
              Confirm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProfileShop;
