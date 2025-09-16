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

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-5">
        <h2 className="text-xl font-bold text-blue-600 mb-6">Seller Dashboard</h2>
        <ul className="space-y-4">
          <li
            className={`cursor-pointer p-2 rounded-lg ${
              activePage === "products" ? "bg-blue-500 text-white" : "hover:bg-blue-100"
            }`}
            onClick={() => setActivePage("products")}
          >
            Manage Products
          </li>
          <li
            className={`cursor-pointer p-2 rounded-lg ${
              activePage === "sales" ? "bg-blue-500 text-white" : "hover:bg-blue-100"
            }`}
            onClick={() => setActivePage("sales")}
          >
            Sales
          </li>
          <li
            className={`cursor-pointer p-2 rounded-lg ${
              activePage === "profile" ? "bg-blue-500 text-white" : "hover:bg-blue-100"
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

export default SellerDashboard;
