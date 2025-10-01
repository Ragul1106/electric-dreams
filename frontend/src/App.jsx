import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LoginPage from "./components/LoginPage";
import OTPModal from "./components/OTPModal";
import ServiceArea from "./pages/ServiceAreas";
import Footer from "./components/Footer";
import ServicePage from './pages/ServicesPage';
import ServiceDetail from "./pages/ServiceDetailPage";
import ServiceInfoPage from "./pages/ServiceInfoPage";
import CheckoutPage from "./pages/CheckoutPage";
import CartModal from "./components/Cart"; // ✅ import CartModal

function App() {
  // 🔹 Global cart state
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // 🔹 Add item to cart
  const handleAddToCart = (service) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === service.id);
      if (existing) {
        return prev.map((item) =>
          item.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...service, quantity: 1 }];
    });
  };

  // 🔹 Update quantity
  const handleUpdateQty = (id, qty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  return (
    <Router>
      {/* Pass cart count + click handler to Navbar */}
      <Navbar
        cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
        onCartClick={() => setCartOpen(true)}
      />

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/otp" element={<OTPModal />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service-area" element={<ServiceArea />} />
          <Route path="/services/:type" element={<ServicePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/services/:type/:id" element={<ServiceDetail />} />

          {/* ✅ Pass addToCart into ServiceInfoPage */}
          <Route
            path="/services/lighting/:id"
            element={<ServiceInfoPage onAddToCart={handleAddToCart} />}
          />
        </Routes>

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </div>
      <Footer />

      {/* ✅ Cart Modal */}
      {cartOpen && cartItems.length > 0 && (
        <CartModal
          cartItem={cartItems} // 🔹 right now only first item shown
          onClose={() => setCartOpen(false)}
          onUpdateQty={handleUpdateQty}
        />
      )}
    </Router>
  );
}

export default App;





// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import LoginPage from "./components/LoginPage";
// import OTPModal from "./components/OTPModal";
// import ServiceArea from "./pages/ServiceAreas";
// import Footer from "./components/Footer";

// import ServicePage from './pages/ServicesPage';
// import ServiceDetail from "./pages/ServiceDetailPage";
// import ServiceInfoPage from "./pages/ServiceInfoPage";
// import CheckoutPage from "./pages/CheckoutPage";



// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <div>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />

//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/otp" element={<OTPModal />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/service-area" element={<ServiceArea />} />
//           <Route path="/services/:type" element={<ServicePage />} />

//           <Route path="/checkout" element={<CheckoutPage />} />
          
//           <Route path="/services/:type/:id" element={<ServiceDetail />} />
//           <Route path="/services/lighting/:id" element={<ServiceInfoPage />} />
          

         

//         </Routes>
//         <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
//       </div>
//       <Footer />
//     </Router>
//   );
// }

// export default App;
