import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-700 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">SpareParts</Link>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
