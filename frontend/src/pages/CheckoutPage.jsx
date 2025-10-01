import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/api";
import PaymentModal from "../components/PaymentModal";

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

    const handlePayNow = () => {
    const payload = {
    cart_item: cartItem.id,
    first_name: form.first_name,
    last_name: form.last_name,
    email: form.email,
    phone: form.phone,
    address: form.address,
    service_date: form.service_date,
  };
        api.post("api/orders/", payload)
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
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="md:w-2/3 border md:me-10 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Checkout</h2>

                {/* Form */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="first_name"
                        value={form.first_name}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="border px-3 py-2 rounded"
                    />
                    <input
                        type="text"
                        name="last_name"
                        value={form.last_name}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="border px-3 py-2 rounded"
                    />
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email id"
                        className="border px-3 py-2 rounded"
                    />
                    <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone number"
                        className="border px-3 py-2 rounded"
                    />
                </div>
                <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Address"
                    className="border px-3 py-2 rounded w-full mt-4"
                ></textarea>

                {/* Payment Options */}
                <div className="mt-6">
                    <h3 className="font-semibold mb-2">Payment Details</h3>
                    <button className="w-full border py-2 rounded mb-2">Pay with UPI</button>
                    <button className="w-full border py-2 rounded mb-2">Pay with Net Banking</button>
                    <button className="w-full border py-2 rounded mb-2">Pay with Card 💳</button>
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
