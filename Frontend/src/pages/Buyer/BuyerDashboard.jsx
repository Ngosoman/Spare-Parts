import React, { useState, useEffect } from "react";

// Placeholder components (For later)
const BrowseProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Products from localStorage (uploaded na sellers)
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Browse Products</h2>
      {products.length === 0 ? (
        <p>No products available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-blue-600 font-semibold mt-2">Ksh {product.price}</p>
              <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Orders = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">My Orders</h2>
    <p>Here you’ll see all your past purchases.</p>
  </div>
);

const Profile = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">My Profile</h2>
    <p>Edit personal details, change password, logout here.</p>
  </div>
);

const BuyerDashboard = () => {
  const [activePage, setActivePage] = useState("browse");

  const renderPage = () => {
    switch (activePage) {
      case "browse":
        return <BrowseProducts />;
      case "orders":
        return <Orders />;
      case "profile":
        return <Profile />;
      default:
        return <BrowseProducts />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-5">
        <h2 className="text-xl font-bold text-green-600 mb-6">Buyer Dashboard</h2>
        <ul className="space-y-4">
          <li
            className={`cursor-pointer p-2 rounded-lg ${
              activePage === "browse" ? "bg-green-500 text-white" : "hover:bg-green-100"
            }`}
            onClick={() => setActivePage("browse")}
          >
            Browse Products
          </li>
          <li
            className={`cursor-pointer p-2 rounded-lg ${
              activePage === "orders" ? "bg-green-500 text-white" : "hover:bg-green-100"
            }`}
            onClick={() => setActivePage("orders")}
          >
            My Orders
          </li>
          <li
            className={`cursor-pointer p-2 rounded-lg ${
              activePage === "profile" ? "bg-green-500 text-white" : "hover:bg-green-100"
            }`}
            onClick={() => setActivePage("profile")}
          >
            Profile
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">{renderPage()}</div>
    </div>
  );
};

export default BuyerDashboard;
