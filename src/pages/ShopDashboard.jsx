import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import ListingForm from "../components/ListingForm";
import ProcessForm from "../components/ProcessForm";
import ShopPerformance from "../components/ShopPerformance";
import ProfileShop, { ShopForm } from "../components/ProfileShop";
import { products, revenue, shopProfile } from "../data/ordersdata";
import { useOrders } from "../context/OrdersContext";

function ShopDashboard() {
  const [shop, setShop] = useState(shopProfile);
  const [editShop, setEditShop] = useState(null);
  const [selected, setSelected] = useState([]);
  const [showForm, setShowForm] = useState(null);
  const [process, setProcess] = useState(null);

  const updateShop = (updated) => {
    setShop(updated);
    setEditShop(false);
  };

  const { pathname } = useLocation();
  useEffect(() => {
    setSelected([]);
  }, [pathname]);

  const navigate = useNavigate();

  const { orders: ordersStatus, shipOrders } = useOrders();
  const processOrders = () => {
    shipOrders(selected);
    setSelected([]);
    setProcess(null);
  };

  const [listing, setListing] = useState(products);
  const activeCount = listing.filter((p) => p.stock > 0).length;
  const outOfStockCount = listing.filter((p) => p.stock === 0).length;
  const totalRevenue = ordersStatus
    .filter((o) => o.status === "Delivered")
    .reduce((sum, o) => sum + o.total, 0);

  const totalSold = listing.reduce((sum, p) => sum + p.sold, 0);

  const buttonConfig = {
    "/my-shop": {
      label: "Add Listing",
      onClick: () => setShowForm("create"),
    },
    "/my-shop/orders": {
      label: `Process Order${selected.length > 0 ? ` (${selected.length})` : ""}`,
      disabled: selected.length === 0,
      onClick: () => setProcess("processorders"),
    },
    "/my-shop/analytics": {
      label: "Print Reports",
      onClick: () => window.print(),
    },
  };

  const addListing = (newProduct) => {
    setListing((prev) => [newProduct, ...prev]);
  };

  const [editing, setEditing] = useState(null);
  const openEdit = (product) => setEditing(product);
  const updateListing = (updated) => {
    setListing((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setEditing(null);
  };

  const deleteListing = (id) => {
    const ok = window.confirm(
      "Hapus produk ini? Aksi ini tidak bisa dibatalkan.",
    );
    if (!ok) return;
    setListing((prev) => prev.filter((p) => p.id !== id));
  };

  const activeBtn = Object.entries(buttonConfig)
    .sort(([a], [b]) => b.length - a.length)
    .find(([path]) => pathname.startsWith(path))?.[1];

  return (
    <>
      <ProfileShop shopProfile={shop} onEdit={() => setEditShop(true)} />

      <div className="bg-[#EDE8DF]">
        <ShopPerformance
          activeCount={activeCount}
          totalCount={listing.length}
          outOfStockCount={outOfStockCount}
          totalRevenue={totalRevenue}
          totalSold={totalSold}
        />
      </div>

      <div className="mx-auto flex w-full max-w-7xl justify-between px-6">
        <div className="flex items-center gap-2 rounded-lg bg-[#9c917e] p-1">
          <NavLink
            to="/my-shop"
            end
            className={({ isActive }) =>
              `rounded-lg p-1 text-sm ${
                isActive ? "bg-[#EDE8DF]" : "text-gray-800"
              }`
            }
          >
            Listings
          </NavLink>
          <NavLink
            to="/my-shop/orders"
            className={({ isActive }) =>
              `rounded-lg p-1 text-sm ${
                isActive ? "bg-[#EDE8DF]" : "text-gray-800"
              }`
            }
          >
            Orders
          </NavLink>
          <NavLink
            to="/my-shop/analytics"
            className={({ isActive }) =>
              `rounded-lg p-1 text-sm ${
                isActive ? "bg-[#EDE8DF]" : "text-gray-800"
              }`
            }
          >
            Analytics
          </NavLink>
        </div>
        {activeBtn && (
          <button
            onClick={activeBtn.onClick}
            disabled={activeBtn.disabled}
            className="rounded-lg bg-[#B85C38] px-2 text-white disabled:opacity-50"
          >
            {activeBtn.label}
          </button>
        )}
      </div>

      <Outlet
        context={{
          selected,
          setSelected,
          ordersStatus,
          listing,
          setListing,
          revenue,
          openEdit,
          deleteListing,
        }}
      />

      {showForm === "create" && (
        <ListingForm onClose={() => setShowForm(null)} onSave={addListing} />
      )}
      {process === "processorders" && (
        <ProcessForm
          orders={ordersStatus.filter((o) => selected.includes(o.id))}
          onClose={() => setProcess(null)}
          onSuccess={processOrders}
        />
      )}
      {editing && (
        <ListingForm
          initialData={editing}
          onClose={() => setEditing(null)}
          onSave={updateListing}
        />
      )}
      {editShop && (
        <ShopForm
          shopProfile={shop}
          onClose={() => setEditShop(false)}
          onSave={updateShop}
        />
      )}
    </>
  );
}

export default ShopDashboard;
