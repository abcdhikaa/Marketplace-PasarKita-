import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [checkoutItems, setCheckoutItems] = useState(null);
  const [checkoutMode, setCheckoutMode] = useState(null);

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          store: product.store,
          image: product.image,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    setCheckoutItems((prev) =>
      prev ? prev.filter((item) => item.id !== id) : prev,
    );
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    );

    setCheckoutItems((prev) =>
      prev
        ? prev
            .map((item) =>
              item.id === id
                ? { ...item, quantity: item.quantity + delta }
                : item,
            )
            .filter((item) => item.quantity > 0)
        : prev,
    );
  };

  const buyNow = (product, quantity = 1) => {
    setCheckoutItems([
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        store: product.store,
        quantity,
      },
    ]);
    setCheckoutMode("buyNow");
  };

  const checkoutCart = () => {
    setCheckoutItems(cart);
    setCheckoutMode("cart");
  };

  const clearCheckout = () => {
    setCheckoutItems(null);
    setCheckoutMode(null);
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        checkoutItems,
        checkoutMode,
        buyNow,
        checkoutCart,
        clearCheckout,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
