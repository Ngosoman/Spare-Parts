import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold text-lg">{order.name}</h3>
              <p>{order.description}</p>
              <p className="text-blue-600 font-semibold">Ksh {order.price}</p>
              <p className="text-gray-500 text-sm">
                {order.date} — {order.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
