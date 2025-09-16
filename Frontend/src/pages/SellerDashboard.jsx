import { Link, Routes, Route } from "react-router-dom";
import AddProduct from "./AddProduct";
import MyListings from "../Dashboard/MyListings";

export default function SellerDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-6">Seller Dashboard</h1>
        <nav className="space-y-4">
          <Link
            to="add-product"
            className="block bg-blue-700 px-4 py-2 rounded hover:bg-blue-600"
          >
             Add Product
          </Link>
          <Link
            to="my-listings"
            className="block bg-blue-700 px-4 py-2 rounded hover:bg-blue-600"
          >
             My Listings
          </Link>
          <Link
            to="sales"
            className="block bg-blue-700 px-4 py-2 rounded hover:bg-blue-600"
          >
             Sales
          </Link>
          <Link
            to="profile"
            className="block bg-blue-700 px-4 py-2 rounded hover:bg-blue-600"
          >
             Profile
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Routes>
          <Route path="add-product" element={<AddProduct />} />
          <Route path="my-listings" element={<MyListings />} />
          <Route
            path="sales"
            element={<div>Sales Page (Coming Soon)</div>}
          />
          <Route
            path="profile"
            element={<div> Profile Page (Coming Soon)</div>}
          />
          <Route
            path="*"
            element={<div> Welcome Seller! Choose an option from sidebar.</div>}
          />
        </Routes>
      </div>
    </div>
  );
}
