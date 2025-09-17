import React, { useState, useEffect } from "react";
import Users from "../Users"; // Manage Users component
import Profile from "../Profile"; // Admin Profile component
import {
  FaUsers,
  FaProjectDiagram,
  FaMoneyBillWave,
  FaUserCog,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [orders, setOrders] = useState([]);

  // Load all live data
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedProjects = JSON.parse(localStorage.getItem("products")) || [];
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    setUsers(storedUsers);
    setProjects(storedProjects);
    setOrders(storedOrders);
  }, []);

  // Delete user
  const handleDeleteUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  // Delete project
  const handleDeleteProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
    localStorage.setItem("products", JSON.stringify(updatedProjects));
  };

  // Calculate total revenue
  const totalRevenue = orders.reduce(
    (sum, order) => sum + parseFloat(order.price || 0),
    0
  );

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
          <button
            onClick={() => {
              window.location.href = "/login";
            }}
            className="flex items-center gap-3 w-full px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6">
        {activeTab === "users" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Manage Users</h2>
            {users.length === 0 ? (
              <p>No users found.</p>
            ) : (
              <table className="min-w-full border border-gray-300 bg-white">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Username</th>
                    <th className="p-2 border">Role</th>
                    <th className="p-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td className="p-2 border">{user.username}</td>
                      <td className="p-2 border">{user.role}</td>
                      <td className="p-2 border">
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-lg"
                          onClick={() => handleDeleteUser(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === "projects" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Manage Projects</h2>
            {projects.length === 0 ? (
              <p>No projects uploaded yet.</p>
            ) : (
              <table className="min-w-full border border-gray-300 bg-white">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Description</th>
                    <th className="p-2 border">Price</th>
                    <th className="p-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => (
                    <tr key={index}>
                      <td className="p-2 border">{project.name}</td>
                      <td className="p-2 border">{project.description}</td>
                      <td className="p-2 border">Ksh {project.price}</td>
                      <td className="p-2 border">
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-lg"
                          onClick={() => handleDeleteProject(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === "payments" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Payment Summary</h2>
            {orders.length === 0 ? (
              <p>No payments found.</p>
            ) : (
              <div>
                <table className="min-w-full border border-gray-300 bg-white mb-4">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-2 border">Product</th>
                      <th className="p-2 border">Buyer</th>
                      <th className="p-2 border">Price</th>
                      <th className="p-2 border">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={index}>
                        <td className="p-2 border">{order.productName}</td>
                        <td className="p-2 border">{order.buyer}</td>
                        <td className="p-2 border">Ksh {order.price}</td>
                        <td className="p-2 border">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h3 className="text-lg font-bold">
                  Total Revenue: Ksh {totalRevenue}
                </h3>
              </div>
            )}
          </div>
        )}

        {activeTab === "profile" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Admin Profile</h2>
            <Profile />
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
