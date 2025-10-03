import React from "react";
import { useNavigate } from "react-router-dom";
export default function CartModal({ cartItem, onClose, onUpdateQty }) {
  const navigate = useNavigate();
  if (!cartItem) return null;


  const price = parseInt(cartItem.service.price.replace("₹", "")) || 0;
  const total = price * cartItem.quantity;
  const remaining = total < 200 ? 200 - total : 0;

  const handleBookNow = () => {
    navigate("/checkout", { state: { cartItem } });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-80 p-5 relative">
        {/* Close */}
        <button onClick={onClose} className="absolute top-2 right-3 text-xl">✖</button>

        <h2 className="text-lg font-bold mb-2">Cart</h2>
        <p className="text-gray-700">{cartItem.service.title}</p>

        {/* Quantity */}
        <div className="flex items-center gap-3 mt-3">
          <span>Add</span>
          <button
            className="border px-2"
            onClick={() => onUpdateQty(cartItem.id, cartItem.quantity - 1)}
            disabled={cartItem.quantity <= 1}
          >
            -
          </button>
          <span className="font-semibold">{cartItem.quantity}</span>
          <button
            className="border px-2"
            onClick={() => onUpdateQty(cartItem.id, cartItem.quantity + 1)}
          >
            +
          </button>
        </div>

        {/* Price */}
        <p className="mt-2">Amount: ₹{total}</p>
        {remaining > 0 && (
          <p className="text-sm text-gray-500">
            Add ₹{remaining} more to save on visitation fees
          </p>
        )}

        {/* Book Now */}
        <button
          onClick={handleBookNow}
          className="bg-[#CD3A00] text-white w-full py-2 mt-4 rounded-full hover:bg-[#b83600]"
        >
          Book now
        </button>

        {/* Offer */}
        <div className="mt-4 border rounded-lg p-3 bg-gray-50">
          <p className="font-medium text-sm">Get visitation fees offer</p>
          <p className="text-xs text-gray-600">On orders above ₹200</p>
          <button className="text-[#CD3A00] text-xs mt-1 hover:underline">
            View more offers
          </button>
        </div>

        {/* UC Promise */}
        <div className="mt-4 border rounded-lg p-3 bg-gray-50 text-sm">
          <p>✔ Verified professionals</p>
          <p>✔ Hassle free booking</p>
          <p>✔ Transparent pricing</p>
        </div>
      </div>
    </div>
  );
}
