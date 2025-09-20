import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-600">No Orders Yet</h2>
        <p className="text-gray-500">Your purchased projects will appear here.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-gray-700 mb-6">My Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-4 flex flex-col"
          >
            <img
              src={order.image}
              alt={order.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold">{order.name}</h3>
            <p className="text-gray-500">{order.description}</p>
            <p className="mt-2 font-bold text-green-600">KSH {order.price}</p>
            <p className="text-sm text-gray-400 mt-1">
              Ordered on: {new Date(order.date).toLocaleDateString()}
            </p>
            <span className="mt-2 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600 self-start">
              {order.status || "Pending"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
