import { useState } from "react";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    brand: "",
    compatibility: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProduct({
      ...product,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!product.image) return alert("Please upload an image");

    const reader = new FileReader();
    reader.onload = () => {
      const newProduct = {
        id: Date.now(),
        ...product,
        image: reader.result, // base64 string
      };

      const existing = JSON.parse(localStorage.getItem("products")) || [];
      localStorage.setItem("products", JSON.stringify([...existing, newProduct]));
      alert("Product added successfully!");

      setProduct({
        name: "",
        price: "",
        description: "",
        brand: "",
        compatibility: "",
        image: null,
      });
    };
    reader.readAsDataURL(product.image);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Spare Part</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Spare Part Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price (Ksh)"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="brand"
          value={product.brand}
          onChange={handleChange}
          placeholder="Brand (Toyota, Nissan, BMW...)"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="compatibility"
          value={product.compatibility}
          onChange={handleChange}
          placeholder="Compatible Models (e.g. Toyota Premio, Axio)"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          rows="3"
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
        >
          Upload Product
        </button>
      </form>
    </div>
  );
}
