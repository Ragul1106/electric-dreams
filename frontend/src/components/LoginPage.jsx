import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import OTPModal from "./OTPModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [loginIdentifier, setLoginIdentifier] = useState(""); // top login input
  const [verifyIdentifier, setVerifyIdentifier] = useState(""); // bottom left input
  const [email, setEmail] = useState(""); // bottom right email
  const [password, setPassword] = useState(""); // bottom right password
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpIdentifier, setOtpIdentifier] = useState("");
  const navigate = useNavigate();

  // 📌 Validators
  const isValidEmail = (val) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  const isValidPhone = (val) =>
    /^[0-9]{10}$/.test(val.trim());

  const sendOtp = async (targetIdentifier) => {
    try {
      await api.post(`/api/send-otp/`, { identifier: targetIdentifier });
      setOtpIdentifier(targetIdentifier);
      setOtpOpen(true);
      toast.success("OTP sent successfully!");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Failed to send OTP");
    }
  };

  // 🔹 Top Login Button
  const onLoginClick = () => {
    if (!loginIdentifier) return toast.error("Enter phone number or email");
    if (!(isValidEmail(loginIdentifier) || isValidPhone(loginIdentifier))) {
      return toast.error("Enter valid email or 10-digit phone number");
    }
    sendOtp(loginIdentifier);
  };

  // 🔹 Bottom Left Verify Button
  const onVerifyClick = () => {
    if (!verifyIdentifier) return toast.error("Enter phone number or email");
    if (!(isValidEmail(verifyIdentifier) || isValidPhone(verifyIdentifier))) {
      return toast.error("Enter valid email or 10-digit phone number");
    }
    sendOtp(verifyIdentifier);
  };

  const onOtpVerified = (access, username) => {
    localStorage.setItem("access", access);

    toast.success(`Logged in as ${username}`);
    setOtpOpen(false);

    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  // 🔹 Bottom Right Email/Password Sign-in
  const onEmailSignIn = async () => {
    if (!email || !password) return toast.error("Enter email & password");
    if (!isValidEmail(email)) return toast.error("Enter valid email");
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters");

    try {
      await api.post("/api/register/", { email, password });
      setOtpIdentifier(email);
      setOtpOpen(true);
      toast.success("Registration successful! OTP sent to your email.");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
      {/* 🔹 Top Login Section */}
      <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-6 w-full max-w-md sm:max-w-lg mb-8 flex flex-col sm:flex-row items-center">
        <div className="flex-1 flex items-start w-full">
          <div className="mr-4 mt-1 text-[#e85a2a] hidden sm:block">
            <FaUserCircle size={42} />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
              Log in to book your services
            </label>
            <label className="text-xs sm:text-sm text-gray-600 mb-1">
              Enter Phone or Email
            </label>
            <input
              type="text"
              placeholder="Phone number or Email"
              className="border border-gray-300 rounded-md px-3 py-2 w-full mb-1 text-sm sm:text-base"
              value={loginIdentifier}
              onChange={(e) => setLoginIdentifier(e.target.value)}
            />
            <p className="text-xs text-red-600">
              Enter your number or email, we will send a verification code
            </p>
          </div>
        </div>

        <div className="sm:ml-6 mt-3 sm:mt-0 w-full sm:w-auto text-center">
          <button
            onClick={onLoginClick}
            className="bg-[#e85a2a] w-full sm:w-auto text-white px-6 py-2 rounded-full text-sm sm:text-base"
          >
            Log in
          </button>
        </div>
      </div>

      {/* 🔹 Bottom Sign-in Section */}
      <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-6 w-full max-w-md sm:max-w-lg">
        <h3 className="text-center text-base font-semibold text-gray-800 mb-6">
          Sign In with email or mobile number
        </h3>

        <div className="flex flex-col sm:flex-row">
          {/* Left: Phone/Identifier Verification */}
          <div className="w-full sm:w-1/2 sm:pr-6 mb-6 sm:mb-0">
            <label className="text-xs sm:text-sm text-gray-600 mb-1 block">
              Phone/Email
            </label>
            <input
              type="text"
              placeholder="Phone or Email"
              className="border border-gray-300 rounded-md px-3 py-2 w-full mb-3 text-sm sm:text-base"
              value={verifyIdentifier}
              onChange={(e) => setVerifyIdentifier(e.target.value)}
            />
            <button
              onClick={onVerifyClick}
              className="bg-[#e85a2a] w-full sm:w-auto text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition text-sm sm:text-base"
            >
              Verify
            </button>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px bg-gray-300 mx-4" />

          {/* Right: Email Login */}
          <div className="w-full sm:w-1/2 sm:pl-6">
            <label className="text-xs sm:text-sm text-gray-600 mb-1 block">
              Email address
            </label>
            <input
              type="email"
              placeholder="Email id"
              className="border border-gray-300 rounded-md px-3 py-2 w-full mb-3 text-sm sm:text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="text-xs sm:text-sm text-gray-600 mb-1 block">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded-md px-3 py-2 w-full mb-3 text-sm sm:text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={onEmailSignIn}
              className="bg-[#e85a2a] w-full sm:w-auto text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition text-sm sm:text-base"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      <OTPModal
        open={otpOpen}
        identifier={otpIdentifier}
        onClose={() => setOtpOpen(false)}
        onVerified={onOtpVerified}
      />

      {/* Toastify container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}
