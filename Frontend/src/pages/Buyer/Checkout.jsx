import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const Checkout = () => {
  const { id } = useParams(); // product id from URL
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(product ? product.price : "");
  const [accountReference, setAccountReference] = useState("");
  const [transaction, setTransaction] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!product) {
      // fallback: try to find product in localStorage
      const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
      const foundProduct = storedProducts.find((p) => String(p.id) === String(id));
      setProduct(foundProduct);
      if (foundProduct) setAmount(foundProduct.price);
    }
  }, [id, product]);

  const handlePayment = async () => {
    if (!product) return;

    const buyer = JSON.parse(localStorage.getItem("user"));
    if (!buyer) {
      alert("Please login to complete purchase.");
      navigate("/login");
      return;
    }

    setLoading(true);

    // Prepare Mpesa data
    const MpesaData = {
      phone_number: phone,
      amount: amount,
      account_reference: accountReference,
      transaction: transaction,
    };

    try {
      // const token = localStorage.getItem("token"); // or however you store it
      // Send payment request to backend
      const response = await fetch("http://127.0.0.1:8000/api/stk_push/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(MpesaData),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.detail || "Payment failed. Please try again.");
        setLoading(false);
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
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePayment();
  };

  if (!product)
    return (
      <div className="text-center mt-10 text-red-600 font-bold">
        Product not found. Please go back and select a product.
      </div>
    );

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

        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Amount</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder={product.price}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Account Reference</label>
            <input
              type="text"
              value={accountReference}
              onChange={(e) => setAccountReference(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter account reference"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Transaction Description</label>
            <input
              type="text"
              value={transaction}
              onChange={(e) => setTransaction(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter transaction description"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 w-full
            text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 
            to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200"
          >
            <span
              className="relative px-5 py-2.5 transition-all ease-in duration-75 
              bg-white rounded-md group-hover:bg-opacity-0"
            >
              {loading ? "Processing..." : "Buy Now"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
