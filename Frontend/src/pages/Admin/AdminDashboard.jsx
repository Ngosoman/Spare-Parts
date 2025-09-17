import React, { useState } from "react";
import Users from "../Users"; // user management
import Profile from "../Profile"; // admin profile
import { FaUsers, FaProjectDiagram, FaMoneyBillWave, FaUserCog, FaSignOutAlt } from "react-icons/fa";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

  // Example dummy admin
  const admin = {
    id: 1,
    username: "Admin",
    email: "admin@spareparts.com",
  };

  // Dummy state for users
  const [users, setUsers] = useState([
    { id: 1, username: "buyer1", email: "buyer1@mail.com", role: "Buyer" },
    { id: 2, username: "seller1", email: "seller1@mail.com", role: "Seller" },
  ]);

  // Update user info
  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
  };

  // Reset password logic
  const handleResetPassword = (id) => {
    alert(`Password reset link sent for user ID: ${id}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col">
        <div className="px-6 py-4 text-2xl font-bold border-b border-blue-700">
          Admin Dashboard
        </div>
        <nav className="flex-grow px-4 py-6 space-y-4">
          <button
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg ${
              activeTab === "users" ? "bg-blue-600" : "hover:bg-blue-700"
            }`}
            onClick={() => setActiveTab("users")}
          >
            <FaUsers /> Users
          </button>

          <button
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg ${
              activeTab === "projects" ? "bg-blue-600" : "hover:bg-blue-700"
            }`}
            onClick={() => setActiveTab("projects")}
          >
            <FaProjectDiagram /> Projects
          </button>

          <button
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg ${
              activeTab === "payments" ? "bg-blue-600" : "hover:bg-blue-700"
            }`}
            onClick={() => setActiveTab("payments")}
          >
            <FaMoneyBillWave /> Payments
          </button>

          <button
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg ${
              activeTab === "profile" ? "bg-blue-600" : "hover:bg-blue-700"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <FaUserCog /> Profile
          </button>
        </nav>

        <div className="p-4 border-t border-blue-700">
          <button className="flex items-center gap-3 w-full px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6">
        {activeTab === "users" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Manage Users</h2>
            <Users
              users={users}
              onUpdateUser={handleUpdateUser}
              onResetPassword={handleResetPassword}
            />
          </div>
        )}

        {activeTab === "projects" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Manage Projects</h2>
            <p>Here admin can view, approve, or delete uploaded projects.</p>
            {/* Later we link this to real projects data */}
          </div>
        )}

        {activeTab === "payments" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Payment Summary</h2>
            <table className="w-full border border-gray-300 bg-white rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2 border">User</th>
                  <th className="p-2 border">Amount</th>
                  <th className="p-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border">buyer1</td>
                  <td className="p-2 border">KES 1500</td>
                  <td className="p-2 border">Completed</td>
                </tr>
                <tr>
                  <td className="p-2 border">buyer2</td>
                  <td className="p-2 border">KES 2000</td>
                  <td className="p-2 border">Pending</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "profile" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Admin Profile</h2>
            <Profile
              user={admin}
              onUpdateUser={handleUpdateUser}
              onResetPassword={handleResetPassword}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
