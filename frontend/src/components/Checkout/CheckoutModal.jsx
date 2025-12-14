import React, { useState, useEffect } from "react";

export default function CheckoutModal({
  open,
  onClose,
  product,
  selectedColor,
  quantity = 1,
  onPlaced,
  onSaved, // new prop for save
}) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    paymentMethod: "Cash on Delivery", // Default payment method
    notes: "",
  });
  const [qty, setQty] = useState(Math.max(1, Number(quantity) || 1));

  useEffect(() => {
    if (!open) {
      setForm({
        fullName: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        paymentMethod: "Cash on Delivery",
        notes: "",
      });
      setQty(Math.max(1, Number(quantity) || 1));
    }
  }, [open, quantity]);

  if (!open) return null;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const requiredFields = ["fullName", "phone", "addressLine1", "city", "state", "zipCode", "country", "paymentMethod"];
    for (const field of requiredFields) {
      if (!form[field]) {
        alert(`Please fill in the required field: ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return;
      }
    }

    // Construct order data
    const orderData = {
      buyer: "", // This will be filled on the backend from the authenticated user
      product: {
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
        selectedColor: selectedColor,
      },
      quantity: qty,
      shippingAddress: {
        fullName: form.fullName,
        phone: form.phone, 
        addressLine1: form.addressLine1,
        addressLine2: form.addressLine2,
        city: form.city,
        state: form.state,
        zipCode: form.zipCode,
        country: form.country,
      },
      paymentMethod: form.paymentMethod,
      notes: form.notes,
      seller: product.owner, // Assuming product has an 'owner' field which is the seller's ID
    };

    // Send order to backend
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Order placed successfully!");
        onPlaced?.(data.order);
        onClose();
      } else {
        alert(`Failed to place order: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing your order.");
    }
  };

  const unitPrice = product ? Number(product.price) : 0;
  const subTotal = unitPrice * qty;
  const delivery = 0;
  const total = subTotal + delivery;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal container - Dark Theme */}
      <div className="relative bg-gray-900 w-11/12 md:w-4/5 lg:w-3/4 max-h-[90vh] rounded-lg shadow-2xl flex flex-col border border-gray-700 text-gray-100">
        
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-3 border-b border-gray-700 bg-gray-800">
          <h3 className="text-xl font-semibold text-blue-400">Checkout</h3>
          <button
            className="text-gray-400 hover:text-blue-400 p-2 rounded-full transition-colors duration-200"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Body (scrollable) */}
        <div className="flex-1 overflow-auto flex flex-col md:flex-row">
          
          {/* Left: Contact & Address */}
          <form className="flex-1 p-5 space-y-4 bg-gray-800">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="03XXXXXXXXX"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Address Line 1
              </label>
              <input
                type="text"
                className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={form.addressLine1}
                onChange={(e) => setForm({ ...form, addressLine1: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Address Line 2 (Optional)
              </label>
              <input
                type="text"
                className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={form.addressLine2}
                onChange={(e) => setForm({ ...form, addressLine2: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  City
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  State
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Zip Code
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={form.zipCode}
                  onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Payment Method
              </label>
              <select
                className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none cursor-pointer"
                value={form.paymentMethod}
                onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                required
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                {/* Add other payment methods as needed */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Order Notes (optional)
              </label>
              <textarea
                className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                rows={2}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>
          </form>

          {/* Right: Order Summary */}
          <aside className="md:w-80 w-full border-t md:border-t-0 md:border-l border-gray-700 p-5 space-y-4 bg-gray-800">
            <h4 className="text-xl font-semibold text-blue-300">Order Summary</h4>
            <div className="flex items-center gap-3">
              <img
                src={product?.image}
                alt={product?.name}
                className="w-16 h-16 object-cover rounded border border-gray-600"
              />
              <div>
                <p className="font-medium text-gray-100 line-clamp-2">
                  {product?.name}
                </p>
                <p className="text-sm text-gray-400">
                  {selectedColor ? `Color: ${selectedColor}` : null}
                </p>
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Quantity</span>
              <div className="inline-flex items-center border border-gray-600 rounded-md overflow-hidden">
                <button
                  type="button"
                  onClick={() =>
                    setQty((q) => Math.max(1, Number(q || 1) - 1))
                  }
                  className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-100 transition-colors duration-200"
                >
                  -
                </button>
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) =>
                    setQty(Math.max(1, Number(e.target.value) || 1))
                  }
                  className="w-16 text-center outline-none py-2 bg-gray-800 text-gray-100 border-x border-gray-600"
                />
                <button
                  type="button"
                  onClick={() =>
                    setQty((q) => Math.max(1, Number(q || 1) + 1))
                  }
                  className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-100 transition-colors duration-200"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-300 space-y-2">
              <div className="flex justify-between">
                <span>Unit Price</span>
                <span>Rs {unitPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs {subTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>Rs {delivery}</span>
              </div>
              <div className="flex justify-between font-semibold text-blue-300 border-t border-gray-700 pt-2">
                <span>Total</span>
                <span>Rs {total.toLocaleString()}</span>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer Buttons */}
        <div className="border-t border-gray-700 px-5 py-3 flex gap-3 bg-gray-800">
          <button
            type="button"
            onClick={handlePlaceOrder}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 font-semibold"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}










