import { useEffect, useState } from "react";

export default function MyListings() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(stored);
  }, []);

  const handleDelete = (id) => {
    const updated = products.filter((item) => item.id !== id);
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Spare Parts</h2>

      {products.length === 0 ? (
        <p className="text-gray-500">No products uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl shadow-md border"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              )}
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">Ksh {item.price}</p>
              <p className="text-sm text-gray-500">{item.brand}</p>
              <p className="text-xs text-gray-400 mb-2">
                {item.compatibility}
              </p>
              <p className="text-sm mb-3">{item.description}</p>

              <div className="flex justify-between">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
                <button className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-800">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
