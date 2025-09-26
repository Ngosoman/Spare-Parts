import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BrowseProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all products from localStorage
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Browse Products</h2>
      {products.length === 0 ? (
        <p>No products available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              {/* Product Image */}
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              )}

              {/* Product Info */}
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-blue-600 font-semibold mt-2">
                Ksh {product.price}
              </p>

              {/* Buy Button */}
              <Link to={`/buyer/checkout/${product.id}`} state={{ product }}>
                <button className="mt-3 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Buy Now
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseProducts;
