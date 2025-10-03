import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/api";
import PaymentModal from "../components/PaymentModal";
import upiLogo from "../assets/checkupi.png";
import netBankingLogo from "../assets/checkNetBanking.png";
import visaLogo from "../assets/checkVisa.png";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItem } = location.state || {};

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    service_date: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(""); // ✅ added
  const [errors, setErrors] = useState({}); // ✅ validation errors

  if (!cartItem) {
    return (
      <p className="p-10 text-center">
        No items in checkout. Please add to cart first.
      </p>
    );
  }

  const price = parseInt(cartItem.service.price.replace("₹", "")) || 0;
  const visitationFee = 60;
  const taxes = 19;
  const total = price * cartItem.quantity + visitationFee + taxes;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Validation logic
  const validateForm = () => {
    const newErrors = {};
    if (!form.first_name.trim()) newErrors.first_name = "First name is required";
    if (!form.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.service_date.trim()) newErrors.service_date = "Please select a date";
    if (!selectedPayment) newErrors.payment = "Select a payment method";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayNow = () => {
    if (!validateForm()) return;

    const payload = {
      cart_item: cartItem.id,
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      service_date: form.service_date,
      payment_method: selectedPayment, // ✅ send selected payment
    };
    api
      .post("api/orders/", payload)
      .then(() => {
        localStorage.removeItem("cart");
        setShowModal(true);
      })
      .catch((err) => console.error("Order error:", err));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row gap-10 p-6">
      {/* LEFT SIDE */}
      <div className="md:w-1/2 md:h-110 md:mx-20 rounded-lg p-6 bg-[#CD3A00cc] text-white flex flex-col justify-between">
        {/* Service Info */}
        <div>
          <div className="flex gap-3 items-center">
            <img
              src={cartItem.service.image}
              alt={cartItem.service.title}
              className="w-16 h-16 object-cover rounded-2xl"
            />
            <div>
              <h2 className="font-bold">{cartItem.service.title}</h2>
              <p>Light quantity: {cartItem.quantity}</p>
              <p>Amount: ₹{price}</p>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="mt-6 border-t border-white pt-4 text-sm space-y-1">
            <h2 className="font-bold mb-2">Payment Summary</h2>
            <p className="flex justify-between">
              <span>Item total</span> <span>₹{price}</span>
            </p>
            <p className="flex justify-between">
              <span>Visitation fees</span> <span>₹{visitationFee}</span>
            </p>
            <p className="flex justify-between">
              <span>Taxes and fees</span> <span>₹{taxes}</span>
            </p>
            <hr className="my-2 border-white" />
            <p className="flex justify-between font-bold">
              <span>Total Amount</span> <span>₹{total}</span>
            </p>
            <hr className="my-2 border-white" />
            <p className="flex justify-between">
              <span>Amount to pay</span> <span>₹{total}</span>
            </p>
          </div>
        </div>

        {/* Date Picker */}
        <div className="mt-6">
          <p className="mb-1 text-white">Select Services date</p>
          <input
            type="date"
            name="service_date"
            value={form.service_date}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full text-black"
          />
          {errors.service_date && (
            <p className="text-red-300 text-sm mt-1">{errors.service_date}</p>
          )}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="md:w-2/3 border md:me-10 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Checkout</h2>

        {/* Form */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="border px-3 py-2 rounded w-full"
            />
            {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
          </div>
          <div>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="border px-3 py-2 rounded w-full"
            />
            {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email id"
              className="border px-3 py-2 rounded w-full"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone number"
              className="border px-3 py-2 rounded w-full"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
        </div>
        <div className="mt-4">
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="border px-3 py-2 rounded w-full"
          ></textarea>
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>

        {/* Payment Options */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Payment Details</h3>

          {/* UPI */}
          <button
            type="button"
            onClick={() => setSelectedPayment("UPI")}
            className={`w-full border flex items-center justify-between px-4 py-3 rounded mb-2 font-medium transition ${
              selectedPayment === "UPI"
                ? "bg-[#F6561680] text-white border-[#FF6B2C]"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span>Pay with UPI</span>
            <img src={upiLogo} alt="UPI" className="h-6" />
          </button>

          {/* Net Banking */}
          <button
            type="button"
            onClick={() => setSelectedPayment("NetBanking")}
            className={`w-full border flex items-center justify-between px-4 py-3 rounded mb-2 font-medium transition ${
              selectedPayment === "NetBanking"
                ? "bg-[#F6561680] text-white border-[#FF6B2C]"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span>Pay with Net Banking</span>
            <img src={netBankingLogo} alt="Net Banking" className="h-6" />
          </button>

          {/* Card */}
          <button
            type="button"
            onClick={() => setSelectedPayment("Card")}
            className={`w-full border flex items-center justify-between px-4 py-3 rounded mb-2 font-medium transition ${
              selectedPayment === "Card"
                ? "bg-[#F6561680] text-white border-[#FF6B2C]"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span>Pay with Card</span>
            <img src={visaLogo} alt="Card" className="h-6" />
          </button>

          {errors.payment && <p className="text-red-500 text-sm">{errors.payment}</p>}
        </div>

        {/* Pay Now */}
        <button
          onClick={handlePayNow}
          className="bg-[#CD3A00cc] cursor-pointer text-white w-full py-3 mt-6 rounded-full hover:bg-[#b83600]"
        >
          Pay Now
        </button>
      </div>

      {/* ✅ Payment Confirmation Modal */}
      <PaymentModal show={showModal} onClose={() => navigate("/")} />
    </div>
  );
}
