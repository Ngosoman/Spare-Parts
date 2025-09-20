import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Get current buyer from localStorage
    const buyer = JSON.parse(localStorage.getItem("user"));
    // You can use buyer.username directly if needed elsewhere
    // Get all orders from localStorage
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // Filter orders for current buyer
    const myOrders = buyer
      ? allOrders.filter((order) => order.buyer === buyer.username)
      : [];

    setOrders(myOrders);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet. Browse products to make a purchase!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3 border">Product</th>
                <th className="p-3 border">Seller</th>
                <th className="p-3 border">Price (Ksh)</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-100">
                  <td className="p-3 border">{order.productName}</td>
                  <td className="p-3 border">{order.seller}</td>
                  <td className="p-3 border">Ksh {order.price}</td>
                  <td className="p-3 border">{order.date}</td>
                  <td className="p-3 border">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
