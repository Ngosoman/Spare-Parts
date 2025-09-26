import React, { useState, useEffect } from "react";

const Profile = () => {
  const [buyer, setBuyer] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
  });
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("user"));
    if (authUser && authUser.role === "buyer") {
      const storedProfiles = JSON.parse(localStorage.getItem("buyers")) || {};
      const profile = storedProfiles[authUser.username] || {
        name: authUser.username,
        email: "",
        password: "",
        photo: "",
      };
      setBuyer(profile);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBuyer({ ...buyer, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () =>
        setBuyer({ ...buyer, photo: reader.result }); // base64
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const storedProfiles = JSON.parse(localStorage.getItem("buyers")) || {};
    const authUser = JSON.parse(localStorage.getItem("user"));
    storedProfiles[authUser.username] = buyer;
    localStorage.setItem("buyers", JSON.stringify(storedProfiles));
    setEditing(false);
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      {editing ? (
        <>
          <label className="block mb-2">Profile Photo</label>
          <input type="file" onChange={handlePhotoUpload} className="mb-4" />
          {buyer.photo && (
            <img
              src={buyer.photo}
              alt="Profile"
              className="w-24 h-24 object-cover rounded-full mb-4"
            />
          )}

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
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={buyer.password}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-sm text-gray-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

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
          {buyer.photo && (
            <img
              src={buyer.photo}
              alt="Profile"
              className="w-24 h-24 object-cover rounded-full mb-4"
            />
          )}
          <p className="mb-2">
            <strong>Name:</strong> {buyer.name}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {buyer.email}
          </p>
          <p className="mb-6">
            <strong>Password:</strong> ****** 
          </p>

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
