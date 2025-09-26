import { useEffect, useState } from "react";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("sellerProfile")) || {};
    setProfile(stored);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];

      // Prevent very large files (max 1MB)
      if (file.size > 1024 * 1024) {
        setMessage({ text: "Image too large! Please upload less than 1MB.", type: "error" });
        return;
      }

      const reader = new FileReader();
      reader.onload = () =>
        setProfile((prev) => ({
          ...prev,
          avatar: reader.result,
        }));
      reader.readAsDataURL(file);
    } else {
      setProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem("sellerProfile", JSON.stringify(profile));
      setMessage({ text: "Profile updated successfully!", type: "success" });
    } catch (err) {
      console.error("Storage error:", err);
      setMessage({ text: "Error saving profile! Try using a smaller image.", type: "error" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("sellerProfile");
    localStorage.removeItem("user");
    setMessage({ text: "You have been logged out!", type: "success" });
    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  };

  return (
    <div className="flex-1 p-6">
      <h2 className="text-2xl font-bold mb-6"> My Profile</h2>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
        {/* Message */}
        {message.text && (
          <div
            className={`mb-4 p-3 rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-700 border border-green-400"
                : "bg-red-100 text-red-700 border border-red-400"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Avatar */}
        <div className="flex items-center space-x-6 mb-6">
          <img
            src={
              profile.avatar ||
              "https://via.placeholder.com/100x100.png?text=Profile"
            }
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
            className="block text-sm"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={profile.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800"
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
