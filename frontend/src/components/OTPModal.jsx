import React, { useState, useRef, useEffect } from "react";
import api from "../api/api";
import { toast } from "react-toastify";

export default function OTPModal({ open, identifier, onClose, onVerified }) {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(60);
  const inputsRef = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    if (!open) return;
    setDigits(["", "", "", ""]);
    setResendTimer(60);
    const timer = setInterval(() => {
      setResendTimer((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [open]);

  const changeDigit = (i, v) => {
    if (v.length > 1) v = v.slice(-1);
    const arr = [...digits];
    arr[i] = v;
    setDigits(arr);
    if (v && i < 3) inputsRef[i + 1].current.focus();
  };

  const submit = async () => {
    const code = digits.join("");
    if (code.length !== 4) return toast.error("Enter full OTP code");
    try {
      const res = await api.post(`/api/verify-otp/`, {
        identifier,
        code,
      });
      toast.success("OTP verified successfully!");
      onVerified(res.data.access, res.data.username);
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Verification failed");
    }
  };

  const resend = async () => {
    if (resendTimer > 0) return;
    try {
      await api.post(`/api/send-otp/`, { identifier });
      setResendTimer(60);
      toast.info("OTP resent! Please check your email/phone.");
    } catch {
      toast.error("Failed to resend OTP");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[360px] shadow-md border border-gray-300 text-center">
        
        {/* Title */}
        <h2 className="text-base font-semibold text-gray-700 mb-4">
          Enter verification code sent to{" "}
          <span className="text-[#e85a2a]">{identifier}</span>
        </h2>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-6 mb-5">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={inputsRef[i]}
              value={d}
              onChange={(e) =>
                changeDigit(i, e.target.value.replace(/\D/g, ""))
              }
              className="w-10 text-center text-lg border-0 border-b-2 border-gray-500 focus:outline-none focus:border-[#e85a2a]"
              maxLength={1}
            />
          ))}
        </div>

        {/* Resend Section */}
        <div className="text-sm text-gray-700 mb-6">
          Not received?{" "}
          <button
            className="text-[#e85a2a] font-medium hover:underline disabled:opacity-50"
            onClick={resend}
            disabled={resendTimer > 0}
          >
            Resend
          </button>
          {resendTimer > 0 && (
            <div className="text-xs text-[#e85a2a] mt-1">
              Try again in {resendTimer}s
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            className="px-6 py-2 rounded-full bg-[#e85a2a] text-white font-medium hover:bg-[#d94f1e] transition"
            onClick={onClose}
          >
            Back
          </button>
          <button
            className="px-6 py-2 rounded-full bg-[#e85a2a] text-white font-medium hover:bg-[#d94f1e] transition"
            onClick={submit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
