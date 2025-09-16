import React, { useState, useEffect } from "react";

const BrowseProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from localStorage
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
          {products.map((product, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-blue-600 font-semibold mt-2">Ksh {product.price}</p>
              <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseProducts;
