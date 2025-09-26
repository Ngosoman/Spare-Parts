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
        // Existing dashboards' sidebar inside components
        <div className="flex flex-1">
          
          <main className="flex-1 bg-gray-100 p-6">
            {children}
          </main>
        </div>
      ) : (
        // routes for navbar + footer
        <>
          <Navbar user={user} onLogout={onLogout} />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  // When the app loads, check localStorage for logged user
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
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

  return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />

          {/*  dashboard routes */}
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
          
          {/* buyer Chekout */}
          <Route path="/buyer/checkout/:id" element={<Checkout />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
