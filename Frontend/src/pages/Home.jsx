import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to DevSoko Spare Parts Marketplace
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Find genuine car spare parts from trusted sellers across Kenya 
        </p>
        <button
          onClick={() => navigate("/buyer/browse")}
          className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          Browse Products
        </button>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
            <img
              src="https://img.icons8.com/ios-filled/100/000000/car--v1.png"
              alt="Engine Parts"
              className="mx-auto mb-4"
            />
            <h3 className="font-semibold text-lg mb-2">Engine Parts</h3>
            <p className="text-gray-600 text-sm">
              Pistons, spark plugs, belts, and more.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
            <img
              src="https://img.icons8.com/ios-filled/100/000000/car-battery.png"
              alt="Electricals"
              className="mx-auto mb-4"
            />
            <h3 className="font-semibold text-lg mb-2">Electricals</h3>
            <p className="text-gray-600 text-sm">
              Batteries, alternators, wiring kits.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
            <img
              src="https://img.icons8.com/ios-filled/100/000000/car-seat.png"
              alt="Interior"
              className="mx-auto mb-4"
            />
            <h3 className="font-semibold text-lg mb-2">Interior</h3>
            <p className="text-gray-600 text-sm">
              Seats, mats, dashboards, and covers.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Are you a seller?</h2>
        <p className="text-gray-700 mb-6">
          Upload your spare parts today and reach thousands of buyers.
        </p>
        <button
          onClick={() => navigate("/seller/dashboard")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Go to Seller Dashboard
        </button>
      </section>
    </div>
  );
}

export default Home;
