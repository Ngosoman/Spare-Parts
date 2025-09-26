import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useMessage } from "../context/MessageContext";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setMessage } = useMessage();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage({ type: 'error', text: "Please fill in all fields" });
      return;
    }

    // Admin credentials
    if (username === "Admin" && password === "AdminSpareParts") {
      const adminUser = { username: "Admin", role: "admin" };
      onLogin(adminUser.username, adminUser.role);
      navigate("/AdminDashboard");
      return;
    }

    //  Fetch registered users (buyers/sellers) from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user exists
    const existingUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!existingUser) {
      setMessage({ type: 'error', text: "Invalid username or password" });
      return;
    }

    // Save current user session
    onLogin(existingUser.username, existingUser.role);

    // Navigate based on role
    if (existingUser.role === "buyer") {
      navigate("/BuyerDashboard");
    } else if (existingUser.role === "seller") {
      navigate("/SellerDashboard");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login
        </h2>

        {/* Username */}
        <div>
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Enter your username"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

        {/* Register link */}
        <p className="text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
