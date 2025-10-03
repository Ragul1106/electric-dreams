// src/components/CallbackRequest.jsx
import React, { useState } from "react";
import api from "../api/api"; // expect an axios instance with baseURL configured
// If you don't have api, replace api.post(...) with fetch('/api/call-requests/', {...})

export default function CallbackRequest() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    services: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // null | "success" | "error"
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.mobile.trim()) return "Please enter your mobile number.";
    if (!form.email.trim()) return "Please enter your email address.";
    // basic email pattern
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(form.email)) return "Please enter a valid email address.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setErrorMsg("");
    const v = validate();
    if (v) {
      setStatus("error");
      setErrorMsg(v);
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        mobile: form.mobile,
        email: form.email,
        services: form.services,
      };
      // POST to backend endpoint
      await api.post("/api/contact/call-requests/", payload);
      setStatus("success");
      setForm({ name: "", mobile: "", email: "", services: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
      if (err.response && err.response.data) {
        // try to parse error
        const data = err.response.data;
        setErrorMsg(
          data.detail ||
            (data.non_field_errors && data.non_field_errors.join(", ")) ||
            JSON.stringify(data)
        );
      } else {
        setErrorMsg("Network error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl md:max-w-lg mx-auto bg-[#2f78bf] rounded-2xl p-6 md:p-8 text-white shadow-lg">
      <h3 className="text-2xl font-bold mb-1">Request a call back</h3>
      <p className="text-sm mb-6">
        Fill-in your details below and we will get back to you within 30 minutes
        or less!
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full bg-white text-gray-800 placeholder-gray-600 rounded-xl py-4 px-4 focus:outline-none"
          />
        </div>

        <div>
          <input
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Mobile"
            className="w-full bg-white text-gray-800 placeholder-gray-600 rounded-xl py-4 px-4 focus:outline-none"
          />
        </div>

        <div>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email address"
            className="w-full bg-white text-gray-800 placeholder-gray-600 rounded-xl py-4 px-4 focus:outline-none"
          />
        </div>

        <div>
          <input
            name="services"
            value={form.services}
            onChange={handleChange}
            placeholder="Services"
            className="w-full bg-white text-gray-800 placeholder-gray-600 rounded-xl py-4 px-4 focus:outline-none"
          />
        </div>

        {status === "error" && (
          <div className="text-sm text-yellow-100 bg-red-600/30 p-2 rounded">
            {errorMsg || "Something went wrong"}
          </div>
        )}
        {status === "success" && (
          <div className="text-sm text-green-900 bg-green-200 p-2 rounded">
            Thank you — we received your request. A confirmation email has been
            sent to you.
          </div>
        )}

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-full px-8 py-3 shadow-lg"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
}