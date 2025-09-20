import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Checkout = () => {
  const { id } = useParams(); // product id from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const foundProduct = storedProducts.find((p) => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  const handlePayment = () => {
    if (!product) return;

    // Get logged in buyer
    const buyer = JSON.parse(localStorage.getItem("user"));
    if (!buyer || buyer.role !== "buyer") {
      alert("Please login as a buyer to complete purchase.");
      navigate("/login");
      return;
    }

    // Create new sale record
    const newSale = {
      id: Date.now(), // unique ID
      product: product.name,
      buyer: buyer.username,
      price: product.price,
      date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
      sellerId: product.sellerId, // important for Seller Sales
    };

    // Save sale to localStorage
    const existingSales = JSON.parse(localStorage.getItem("sales")) || [];
    existingSales.push(newSale);
    localStorage.setItem("sales", JSON.stringify(existingSales));

    alert(`Payment successful! Order placed for ${product.name}.`);
    navigate("/buyer/orders");
  };

  if (!product) return <p className="text-center mt-10">Loading product...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Checkout</h2>

        <div className="mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-52 object-cover rounded-lg shadow-md"
          />
          <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-500">{product.description}</p>
          <p className="mt-2 font-bold text-green-600">KSH {product.price}</p>
        </div>

        {/* Animated Buy Now Button */}
        <button
          onClick={handlePayment}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden 
            text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 
            to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white 
            dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
        >
          <span
            className="relative px-5 py-2.5 transition-all ease-in duration-75 
              bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
          >
            Buy Now
          </span>
        </button>
      </div>
    </div>
  );
};

export default Checkout;
