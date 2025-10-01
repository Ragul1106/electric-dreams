import React from "react";
import paymentSuccessImg from "../assets/paycom.png";
export default function PaymentModal({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-100 text-center">
        <div className="flex justify-center mb-2">
          <div className="w-26 h-26 rounded-full flex items-center justify-center">
            
            <img src={paymentSuccessImg} alt="payment-success" />
          </div>
        </div>
        <h2 className="text-lg font-bold mb-2">Payment completed</h2>
        <p className="text-sm text-[#CD3A00]  mb-6">
          Thank you for choosing our electrician services.<br />
          We will contact you soon.
        </p>
        <button
          onClick={onClose}
          className="bg-[#CD3A00] cursor-pointer text-white px-6 py-2 rounded-full hover:bg-[#b83600]"
        >
          Back
        </button>
      </div>
    </div>
  );
}
