import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Listing from "./pages/Listings";
import Orders from "./pages/Orders";
import Analytics from "./pages/Analytics";
import ProductDetail from "./pages/ProductDetail";
import ShopDashboard from "./pages/ShopDashboard";
import { CartProvider } from "./context/CartContext";
import Checkout from "./pages/Checkout";
import Confirm from "./pages/Confirm";
import { OrdersProvider } from "./context/OrdersContext";
import MyOrders from "./pages/MyOrders";
import SearchResults from "./pages/SearchResult";

function App() {
  return (
    <CartProvider>
      <OrdersProvider>
        <div className="min-h-screen flex flex-col bg-[#EDE8DF]">
          <BrowserRouter>
            <Navbar />
            <main className="flex-1 flex flex-col">
              <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/confirm" element={<Confirm />} />
                <Route path="/search" element={<SearchResults />} />

                <Route path="/my-shop" element={<ShopDashboard />}>
                  <Route index element={<Listing />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="analytics" element={<Analytics />} />
                </Route>
                <Route path="/my-orders" element={<MyOrders />} />
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
        </div>
      </OrdersProvider>
    </CartProvider>
  );
}

export default App;
