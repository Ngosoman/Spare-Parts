import { useEffect, useState } from "react";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("sellerProfile"));
    if (stored) {
      setProfile(stored);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProfile({
      ...profile,
      [name]: files ? URL.createObjectURL(files[0]) : value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("sellerProfile", JSON.stringify(profile));
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    alert("You have been logged out!");
    localStorage.removeItem("sellerProfile");
    window.location.href = "/"; // redirect to homepage
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">👤 My Profile</h2>

      <div className="bg-white p-6 rounded-lg shadow-md">
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
