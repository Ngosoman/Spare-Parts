import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppProduct from "./AppProduct";
import Sales from "./Sales";
import Profile from "./Profile";

const SellerDashboard = () => {
  const [activePage, setActivePage] = useState("products");
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "seller") {
      navigate("/login");
      return;
    }

    const stored = JSON.parse(localStorage.getItem("sellerProfile")) || { name: user.username, avatar: "" };
    setProfile(stored);
  }, [navigate]);

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
    localStorage.removeItem("sellerProfile");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col justify-between">
        <div className="p-5">
          <h2 className="text-xl font-bold text-blue-600 mb-6">Seller Dashboard</h2>
          <ul className="space-y-4">
            <li
              className={`cursor-pointer p-2 rounded-lg transition ${
                activePage === "products" ? "bg-blue-500 text-white" : "hover:bg-blue-100"
              }`}
              onClick={() => setActivePage("products")}
            >
              Manage Products
            </li>
            <li
              className={`cursor-pointer p-2 rounded-lg transition ${
                activePage === "sales" ? "bg-blue-500 text-white" : "hover:bg-blue-100"
              }`}
              onClick={() => setActivePage("sales")}
            >
              Sales
            </li>
            <li
              className={`cursor-pointer p-2 rounded-lg transition ${
                activePage === "profile" ? "bg-blue-500 text-white" : "hover:bg-blue-100"
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
          <h1 className="text-xl font-bold text-blue-600">
            Welcome, {profile.name || "Seller"}
          </h1>
          {profile.avatar ? (
            <img
              src={profile.avatar}
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

export default SellerDashboard;
