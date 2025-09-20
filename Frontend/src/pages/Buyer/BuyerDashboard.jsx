import React, { useState } from "react";
import BrowseProducts from "./BrowseProducts";
import Orders from "./Orders";
import Profile from "./Profile";

const BuyerDashboard = () => {
  const [activePage, setActivePage] = useState("browse");

  // Function to render current active page
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
      <aside className="w-64 bg-white shadow-lg p-5 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-green-600 mb-6">
            Buyer Dashboard
          </h2>
          <ul className="space-y-4">
            <li
              className={`cursor-pointer p-2 rounded-lg transition ${
                activePage === "browse"
                  ? "bg-green-500 text-white"
                  : "hover:bg-green-100"
              }`}
              onClick={() => setActivePage("browse")}
            >
              🛍 Browse Products
            </li>
            <li
              className={`cursor-pointer p-2 rounded-lg transition ${
                activePage === "orders"
                  ? "bg-green-500 text-white"
                  : "hover:bg-green-100"
              }`}
              onClick={() => setActivePage("orders")}
            >
              📦 My Orders
            </li>
            <li
              className={`cursor-pointer p-2 rounded-lg transition ${
                activePage === "profile"
                  ? "bg-green-500 text-white"
                  : "hover:bg-green-100"
              }`}
              onClick={() => setActivePage("profile")}
            >
              👤 Profile
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} CarParts Marketplace
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 rounded-lg shadow-inner">
        {renderPage()}
      </main>
    </div>
  );
};

export default BuyerDashboard;
