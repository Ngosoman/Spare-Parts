import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // Categories data
  const categories = [
    {
      name: "Engine Parts",
      desc: "Pistons, spark plugs, belts, and more.",
      icon: "https://img.icons8.com/ios-filled/100/000000/car--v1.png",
    },
    {
      name: "Electricals",
      desc: "Batteries, alternators, wiring kits.",
      icon: "https://img.icons8.com/ios-filled/100/000000/car-battery.png",
    },
    {
      name: "Interior",
      desc: "Seats, mats, dashboards, and covers.",
      icon: "https://img.icons8.com/ios-filled/100/000000/car-seat.png",
    },
    {
      name: "Exterior",
      desc: "Bumpers, doors, mirrors, lights.",
      icon: "https://img.icons8.com/lights",
    },
    {
      name: "Suspension",
      desc: "Shocks, struts, control arms.",
      icon: "https://img.icons8.com/wood",
    },
    {
      name: "Brakes",
      desc: "Brake pads, discs, calipers.",
      icon: "https://img.icons8.com/box",
    },
    {
      name: "Tyres & Wheels",
      desc: "Rims, tyres, wheel caps.",
      icon: "https://img.icons8.com/wheel",
    },
    {
      name: "Transmission",
      desc: "Clutches, gearboxes, shafts.",
      icon: "https://img.icons8.com/gears",
    },
    {
      name: "Oils & Fluids",
      desc: "Engine oil, coolant, brake fluid.",
      icon: "https://img.icons8.com/ios-filled/100/000000/oil-industry.png",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to Spare Parts Marketplace
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Find genuine car spare parts from trusted sellers across Kenya at
          unbeatable prices.
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
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition"
            >
              <img
                src={cat.icon}
                alt={cat.name}
                className="mx-auto mb-4 w-16 h-16"
              />
              <h3 className="font-semibold text-lg mb-2">{cat.name}</h3>
              <p className="text-gray-600 text-sm">{cat.desc}</p>
            </div>
          ))}
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
