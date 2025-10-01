// import React from "react";

// export default function CartModal({ cartItems, onClose, onUpdateQty, onBookNow }) {
//   const total = (cartItems || []).reduce((sum, item) => {
//     const price = parseInt(item.service.price.replace("₹", "")) || 0;
//     return sum + price * item.quantity;
//   }, 0);

//   const remaining = total < 200 ? 200 - total : 0;

//   return (
//     <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl shadow-lg w-96 p-5 relative">
        
//         {/* Close */}
//         <button onClick={onClose} className="absolute top-2 right-3 text-xl">✖</button>

//         <h2 className="text-lg font-bold mb-4">Your Cart</h2>

//         {/* Cart Items */}
//         {(!cartItems || cartItems.length === 0) ? (
//           <p className="text-gray-500 text-center">Your cart is empty 🛒</p>
//         ) : (
//           <div className="space-y-4 max-h-60 overflow-y-auto">
//             {cartItems.map((item) => {
//               const price = parseInt(item.service.price.replace("₹", "")) || 0;
//               const subtotal = price * item.quantity;
//               return (
//                 <div key={item.id} className="border-b pb-3">
//                   <p className="font-semibold">{item.service.title}</p>
//                   <p className="text-sm text-gray-600">₹{price} x {item.quantity} = ₹{subtotal}</p>
//                   <div className="flex items-center gap-2 mt-2">
//                     <button
//                       className="border px-2"
//                       onClick={() => onUpdateQty(item.id, item.quantity - 1)}
//                       disabled={item.quantity <= 1}
//                     >
//                       -
//                     </button>
//                     <span className="font-semibold">{item.quantity}</span>
//                     <button
//                       className="border px-2"
//                       onClick={() => onUpdateQty(item.id, item.quantity + 1)}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* Price Summary */}
//         {cartItems && cartItems.length > 0 && (
//           <>
//             <p className="mt-4 font-semibold">Total: ₹{total}</p>
//             {remaining > 0 && (
//               <p className="text-sm text-gray-500">
//                 Add ₹{remaining} more to save on visitation fees
//               </p>
//             )}

//             {/* Book Now */}
//             <button
//               onClick={onBookNow}
//               className="bg-[#CD3A00] text-white w-full py-2 mt-4 rounded-full hover:bg-[#b83600]"
//             >
//               Book now
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }



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
