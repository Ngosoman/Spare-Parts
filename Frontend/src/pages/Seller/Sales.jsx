import { useEffect, useState } from "react";

export default function Sales() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    // Fetch sales data from localStorage
    const storedSales = JSON.parse(localStorage.getItem("sales")) || [];

    // If no sales exist, seed with sample data
    if (storedSales.length === 0) {
      const sampleSales = [
        {
          id: 1,
          product: "Brake Pads",
          buyer: "John Doe",
          price: 4500,
          date: "2025-08-31",
        },
        {
          id: 2,
          product: "Air Filter",
          buyer: "Mary Wambui",
          price: 1200,
          date: "2025-08-29",
        },
        {
          id: 3,
          product: "Engine Oil",
          buyer: "Kevin Otieno",
          price: 3500,
          date: "2025-08-25",
        },
      ];
      localStorage.setItem("sales", JSON.stringify(sampleSales));
      setSales(sampleSales);
    } else {
      setSales(storedSales);
    }
  }, []);

  const totalRevenue = sales.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6"> Sales Summary</h2>

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
            {sales.length > 0 ? sales[0].product : "N/A"}
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
            {sales.map((sale) => (
              <tr key={sale.id} className="hover:bg-gray-100">
                <td className="p-3 border">{sale.product}</td>
                <td className="p-3 border">{sale.buyer}</td>
                <td className="p-3 border">Ksh {sale.price}</td>
                <td className="p-3 border">{sale.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
