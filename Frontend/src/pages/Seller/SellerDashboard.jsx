import React, { useState } from "react";
import AppProduct from "./AppProduct";
import Sales from "./Sales";
import Profile from "./Profile";

const SellerDashboard = () => {
  const [activePage, setActivePage] = useState("products");

  const renderPage = () => {
    switch (activePage) {
      case "products":
        return <AppProduct />;
      case "sales":
        return <Sales />;
      case "profile":
        return <Profile />;
      default:
        return <AppProduct />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col justify-between">
        <div className="p-5">
          <h2 className="text-xl font-bold text-blue-600 mb-6">
            Seller Dashboard
          </h2>
          <ul className="space-y-4">
            <li
              className={`cursor-pointer p-2 rounded-lg transition ${
                activePage === "products"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100"
              }`}
              onClick={() => setActivePage("products")}
            >
              Manage Products
            </li>
            <li
              className={`cursor-pointer p-2 rounded-lg transition ${
                activePage === "sales"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100"
              }`}
              onClick={() => setActivePage("sales")}
            >
              Sales
            </li>
            <li
              className={`cursor-pointer p-2 rounded-lg transition ${
                activePage === "profile"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100"
              }`}
              onClick={() => setActivePage("profile")}
            >
              Profile
            </li>
          </ul>
        </div>

        {/* Logout at the bottom */}
        <div className="p-5 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">{renderPage()}</div>
    </div>
  );
};

export default SellerDashboard;
