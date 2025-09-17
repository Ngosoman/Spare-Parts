import React, { useState } from "react";
import ManageUsers from "./ManageUsers";
import ManageProjects from "./ManageProjects";
import PaymentSummary from "./PaymentSummary";
import AdminSettings from "./AdminSettings";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("users");

  const renderPage = () => {
    switch (activePage) {
      case "users":
        return <ManageUsers />;
      case "projects":
        return <ManageProjects />;
      case "payments":
        return <PaymentSummary />;
      case "settings":
        return <AdminSettings />;
      default:
        return <ManageUsers />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-5">
        <h2 className="text-xl font-bold text-green-600 mb-6">
          Admin Dashboard
        </h2>
        <ul className="space-y-4">
          <li
            className={`cursor-pointer p-2 rounded-lg ${
              activePage === "users"
                ? "bg-green-500 text-white"
                : "hover:bg-green-100"
            }`}
            onClick={() => setActivePage("users")}
          >
            Manage Users
          </li>
          <li
            className={`cursor-pointer p-2 rounded-lg ${
              activePage === "projects"
                ? "bg-green-500 text-white"
                : "hover:bg-green-100"
            }`}
            onClick={() => setActivePage("projects")}
          >
            Manage Projects
          </li>
          <li
            className={`cursor-pointer p-2 rounded-lg ${
              activePage === "payments"
                ? "bg-green-500 text-white"
                : "hover:bg-green-100"
            }`}
            onClick={() => setActivePage("payments")}
          >
            Payment Summary
          </li>
          <li
            className={`cursor-pointer p-2 rounded-lg ${
              activePage === "settings"
                ? "bg-green-500 text-white"
                : "hover:bg-green-100"
            }`}
            onClick={() => setActivePage("settings")}
          >
            Settings
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">{renderPage()}</div>
    </div>
  );
};

export default AdminDashboard;
