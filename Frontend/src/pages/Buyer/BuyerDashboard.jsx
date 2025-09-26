import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BrowseProducts from "./BrowseProducts";
import Orders from "./Orders";
import Profile from "./Profile";

const BuyerDashboard = () => {
  const [activePage, setActivePage] = useState("browse");
  const [buyer, setBuyer] = useState({});
  const navigate = useNavigate();

  // Load authenticated buyer profile
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "buyer") {
      navigate("/login");
      return;
    }

    const storedProfiles = JSON.parse(localStorage.getItem("buyers")) || {};
    const profile = storedProfiles[user.username] || { name: user.username, photo: "" };
    setBuyer(profile);
  }, [navigate]);

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col justify-between">
        <div className="p-5">
          <h2 className="text-xl font-bold text-green-600 mb-6">Buyer Dashboard</h2>
          <ul className="space-y-4">
            <li
              className={`cursor-pointer p-2 rounded-lg transition ${
                activePage === "browse" ? "bg-green-500 text-white" : "hover:bg-green-100"
              }`}
              onClick={() => setActivePage("browse")}
            >
              Browse Products
            </li>
            <li
              className={`cursor-pointer p-2 rounded-lg transition ${
                activePage === "orders" ? "bg-green-500 text-white" : "hover:bg-green-100"
              }`}
              onClick={() => setActivePage("orders")}
            >
              My Orders
            </li>
            <li
              className={`cursor-pointer p-2 rounded-lg transition ${
                activePage === "profile" ? "bg-green-500 text-white" : "hover:bg-green-100"
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
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-white p-4 shadow-md">
          <h1 className="text-xl font-bold text-green-600">Welcome, {buyer.name}</h1>
          {buyer.photo ? (
            <img
              src={buyer.photo}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-300"></div>
          )}
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{renderPage()}</main>
      </div>
    </div>
  );
};

export default BuyerDashboard;
