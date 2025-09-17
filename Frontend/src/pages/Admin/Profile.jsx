import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = (e) => {
    e.preventDefault();

    // Get stored admin credentials
    const storedAdmin = JSON.parse(localStorage.getItem("admin")) || {
      username: "Admin",
      password: "AdminSpareParts",
    };

    if (oldPassword !== storedAdmin.password) {
      setMessage(" Old password is incorrect.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage(" New passwords do not match.");
      return;
    }

    // Save updated password in localStorage
    const updatedAdmin = { ...storedAdmin, password: newPassword };
    localStorage.setItem("admin", JSON.stringify(updatedAdmin));

    setMessage(" Password updated successfully!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Admin Profile</h2>

      <form
        onSubmit={handleChangePassword}
        className="bg-white shadow-md rounded-lg p-6 mb-6 max-w-md"
      >
        <h3 className="text-lg font-semibold mb-4">Change Password</h3>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Update Password
        </button>

        {message && <p className="mt-3 text-sm">{message}</p>}
      </form>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
