import { useEffect, useState } from "react";

export default function MyListings() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(stored);
  }, []);

  const handleDelete = (id) => {
    const updated = products.filter((item) => item.id !== id);
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedProducts = products.map((item) =>
      item.id === editingProduct.id ? editingProduct : item
    );

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setEditingProduct(null); // close modal
    alert("Product updated successfully!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
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
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-800"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Editing */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                name="name"
                value={editingProduct.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="number"
                name="price"
                value={editingProduct.price}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="brand"
                value={editingProduct.brand}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="compatibility"
                value={editingProduct.compatibility}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <textarea
                name="description"
                value={editingProduct.description}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="3"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
