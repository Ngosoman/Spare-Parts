import { Link, Routes, Route } from "react-router-dom";
import AddProduct from "./AddProduct";
import MyListings from "./MyListings";
import Orders from "./Orders";
import Profile from "./Profile";

export default function SellerDashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5 space-y-6">
        <h2 className="text-2xl font-bold">Seller Panel</h2>
        <nav className="flex flex-col gap-3">
          <Link to="add-product" className="hover:bg-gray-700 p-2 rounded">Add Product</Link>
          <Link to="listings" className="hover:bg-gray-700 p-2 rounded">My Listings</Link>
          <Link to="orders" className="hover:bg-gray-700 p-2 rounded">Orders</Link>
          <Link to="profile" className="hover:bg-gray-700 p-2 rounded">Profile</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Routes>
          <Route path="add-product" element={<AddProduct />} />
          <Route path="listings" element={<MyListings />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}
