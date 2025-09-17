import React, { useEffect, useState } from "react";

const Payments = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Payment Summary</h2>

      {orders.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="p-3 text-left">Buyer</th>
              <th className="p-3 text-left">Project</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="p-3">{order.buyer || "Unknown"}</td>
                <td className="p-3">{order.productName}</td>
                <td className="p-3">Ksh {order.amount}</td>
                <td className="p-3">
                  {order.date
                    ? new Date(order.date).toLocaleString()
                    : "N/A"}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-lg text-white ${
                      order.status === "Completed"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {order.status || "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Payments;
