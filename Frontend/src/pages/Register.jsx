import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("buyer"); // default role buyer

  // toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (username.toLowerCase() === "admin") {
      alert("You cannot register with reserved Admin username");
      return;
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check duplicate username/email
    const userExists = users.some(
      (u) => u.username === username || u.email === email
    );
    if (userExists) {
      alert("User with this username or email already exists");
      return;
    }

    // Create new user
    const newUser = { username, email, password, role };
    users.push(newUser);

    // Save back to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! You can now login.");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Register
        </h2>

        {/* Username */}
        <div>
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Enter a username"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Enter your email"
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
              className="absolute right-3 top-2.5 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-gray-700 mb-2">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Re-enter your password"
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-500"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-gray-700 mb-2">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Register
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
