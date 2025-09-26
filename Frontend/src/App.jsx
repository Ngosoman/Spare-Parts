import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BuyerDashboard from "./pages/Buyer/BuyerDashboard";
import SellerDashboard from "./pages/Seller/SellerDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Checkout from "./pages/Buyer/Checkout";

function Layout({ children, user, onLogout }) {
  const location = useLocation();

  // Define which routes are dashboards
  const dashboardRoutes = [
    "/BuyerDashboard",
    "/SellerDashboard",
    "/AdminDashboard",
  ];

  const isDashboard = dashboardRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen w-full">
      {isDashboard ? (
        //  Dashboards already have their sidebars inside components
        <div className="flex flex-1">
          <main className="flex-1 bg-gray-100 p-6">{children}</main>
        </div>
      ) : (
        //  Public routes to show Navbar + Footer
        <>
          <Navbar user={user} onLogout={onLogout} />
          <main className="flex-grow">{children}</main>
          <Footer />
        </>
      )}
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // track loading state

  // Load user from localStorage on first mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false); // stop loading after checking localStorage
  }, []);

  const handleLogin = (username, role) => {
    const newUser = { username, role };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Prevent premature redirects while loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />

          {/* Buyer Dashboard */}
          <Route
            path="/BuyerDashboard"
            element={
              user && user.role === "buyer" ? (
                <BuyerDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Seller Dashboard */}
          <Route
            path="/SellerDashboard"
            element={
              user && user.role === "seller" ? (
                <SellerDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Admin Dashboard */}
          <Route
            path="/AdminDashboard"
            element={
              user && user.role === "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Buyer Checkout */}
          <Route path="/buyer/checkout/:id" element={<Checkout />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
