import { useEffect, useState } from "react";

export default function Sales() {
  const [sales, setSales] = useState([]);
  // Removed unused user state

  useEffect(() => {
    // Get logged in seller
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser && savedUser.role === "seller") {

      // Fetch all sales
      const storedSales = JSON.parse(localStorage.getItem("sales")) || [];

      // Filter sales for this seller
      const sellerSales = storedSales.filter(
        (sale) => sale.sellerId === savedUser.username
      );

      setSales(sellerSales);
    }
  }, []);

  const totalRevenue = sales.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Sales Summary</h2>

      {sales.length === 0 ? (
        <p className="text-gray-600">No sales yet.</p>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-green-100 p-4 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold">Orders</h3>
              <p className="text-2xl font-bold">{sales.length}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold">Revenue</h3>
              <p className="text-2xl font-bold">Ksh {totalRevenue}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold">Top Product</h3>
              <p className="text-lg font-medium">
                {
                  sales.reduce((top, sale) =>
                    (sales.filter(s => s.product === sale.product).length >
                     sales.filter(s => s.product === top.product).length ? sale : top),
                  sales[0])
                  ?.product
                }
              </p>
            </div>
          </div>

          {/* Sales Table */}
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3 border">Product</th>
                  <th className="p-3 border">Buyer</th>
                  <th className="p-3 border">Price (Ksh)</th>
                  <th className="p-3 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale, idx) => (
                  <tr key={idx} className="hover:bg-gray-100">
                    <td className="p-3 border">{sale.product}</td>
                    <td className="p-3 border">{sale.buyer}</td>
                    <td className="p-3 border">Ksh {sale.price}</td>
                    <td className="p-3 border">{sale.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
