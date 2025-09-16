import React, { useState } from "react";

const Profile = () => {
  // Sample buyer data (later we fetch from localStorage or backend)
  const [buyer, setBuyer] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "******",
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBuyer({ ...buyer, [name]: value });
  };

  const handleSave = () => {
    // Save updated data to localStorage (for now)
    localStorage.setItem("buyerProfile", JSON.stringify(buyer));
    setEditing(false);
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("buyerProfile");
    localStorage.removeItem("authUser"); // if you’re storing logged in user
    window.location.href = "/"; // redirect to home/login
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      {editing ? (
        <>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={buyer.name}
            onChange={handleChange}
            className="w-full border p-2 mb-4 rounded"
          />

          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={buyer.email}
            onChange={handleChange}
            className="w-full border p-2 mb-4 rounded"
          />

          <label className="block mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={buyer.password}
            onChange={handleChange}
            className="w-full border p-2 mb-4 rounded"
          />

          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setEditing(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <p className="mb-2"><strong>Name:</strong> {buyer.name}</p>
          <p className="mb-2"><strong>Email:</strong> {buyer.email}</p>
          <p className="mb-6"><strong>Password:</strong> {buyer.password}</p>

          <button
            onClick={() => setEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Profile;
