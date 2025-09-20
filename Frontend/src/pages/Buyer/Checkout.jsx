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

    const buyer = JSON.parse(localStorage.getItem("user"));
    if (!buyer) {
      alert("Please login to complete purchase.");
      navigate("/login");
      return;
    }

    // --- Create order object ---
    const newOrder = {
      id: Date.now(),
      productId: product.id,
      productName: product.name,
      price: product.price,
      buyer: buyer.username,
      seller: product.seller || "Unknown",
      date: new Date().toLocaleDateString(),
      status: "Completed",
    };

    // --- Save order to buyer's orders ---
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, newOrder])
    );

    // --- Update seller's sales ---
    const existingSales = JSON.parse(localStorage.getItem("sales")) || [];
    localStorage.setItem(
      "sales",
      JSON.stringify([...existingSales, newOrder])
    );

    alert(`Payment successful for ${product.name}!`);
    navigate("/buyer-dashboard"); // Redirect to dashboard
  };

  if (!product) return <p className="text-center mt-10">Loading product...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Checkout</h2>

        <div className="mb-4">
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-52 object-cover rounded-lg shadow-md"
            />
          )}
          <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-500">{product.description}</p>
          <p className="mt-2 font-bold text-green-600">KSH {product.price}</p>
        </div>

        <button
          onClick={handlePayment}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 w-full
            text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 
            to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200"
        >
          <span
            className="relative px-5 py-2.5 transition-all ease-in duration-75 
              bg-white rounded-md group-hover:bg-opacity-0"
          >
            Buy Now
          </span>
        </button>
      </div>
    </div>
  );
};

export default Checkout;
