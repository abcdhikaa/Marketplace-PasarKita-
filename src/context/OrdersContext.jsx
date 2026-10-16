import { createContext, useContext, useState } from "react";
import { orders as initialOrders } from "../data/ordersdata";

const OrdersContext = createContext();

export function OrdersProvider({ children }) {
    const [ orders, setOrders] = useState(initialOrders);

    const shipOrders = (id) => {
        setOrders((prev) => 
            prev.map((o) => (id.includes(o.id) ? { ...o, status: "Shipped" } : o)),
        );
    };

    const confirmDelivered = (id) => {
        setOrders((prev) => 
            prev.map((o) => (o.id === id ? { ...o, status: "Delivered"} : o)),
        );
    };

    const addOrder = (order) => setOrders((prev) => [order, ...prev]);

    return (
        <OrdersContext.Provider
            value={{ orders, shipOrders, confirmDelivered, addOrder}}
        >
            {children}
        </OrdersContext.Provider>
    );
}

export const useOrders = () => useContext(OrdersContext);