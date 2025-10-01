import React, { useState } from "react";
import api from "../api/api";
import { FiPhoneCall } from "react-icons/fi"; 
import { MdOutlineMail } from "react-icons/md";

export default function ContactForm() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await api.post("/api/contact/messages/", form);
      setStatus({ type: "success", message: "Message submitted successfully." });
      setForm({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        address: "",
        message: "",
      });
    } catch (err) {
      console.error("Submit error:", err);
      if (!err.response) {
        setStatus({
          type: "error",
          message: "Network error: could not reach the server. Check backend is running and CORS.",
        });
        setLoading(false);
        return;
      }
      const { status: httpStatus, data } = err.response;
      if (httpStatus === 400 && typeof data === "object") {
        const msgs = Object.entries(data)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
          .join(" | ");
        setStatus({ type: "error", message: `Validation error: ${msgs}` });
      } else if (data && data.detail) {
        setStatus({ type: "error", message: data.detail });
      } else {
        setStatus({ type: "error", message: `Server error (${httpStatus}). Check server logs.` });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left section */}
        <div className="lg:w-1/2 space-y-6">
          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="border border-black p-6 text-center rounded">
              <div className="inline-flex items-center justify-center w-12 h-12 border border-black rounded mb-3">
                <FiPhoneCall className="w-6 h-6" />
              </div>
              <h3 className="font-semibold">Call out Team</h3>
              <p className="mt-2 text-[#E25C26] font-medium">+91-1234567890</p>
            </div>

            <div className="border border-black p-6 text-center rounded">
              <div className="inline-flex items-center justify-center w-12 h-12 border border-black rounded mb-3">
                <MdOutlineMail className="w-6 h-6" />
              </div>
              <h3 className="font-semibold">Reach out to us</h3>
              <p className="mt-2 text-[#E25C26] font-medium">support@electricdreams.com</p>
            </div>
          </div>

          {/* Google Map */}
          <div className="border rounded overflow-hidden">
            <iframe
              title="location-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.337868056029!2d80.27071827507622!3d13.082680887248708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265e1f8b8d4ed%3A0xb59f82bc5eac4295!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1727698470000!5m2!1sen!2sin"
              className="w-full h-64 sm:h-80 md:h-96 border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        {/* Right section - Form */}
        <div className="lg:w-1/2 border border-black p-6 rounded">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm">First Name</label>
                <input
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-black rounded px-3 py-2"
                  placeholder="First Name"
                  required
                />
              </div>
              <div>
                <label className="text-sm">Last Name</label>
                <input
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-black rounded px-3 py-2"
                  placeholder="Last Name"
                />
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Phone Number</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-black rounded px-3 py-2"
                  placeholder="Phone number"
                />
              </div>
              <div>
                <label className="text-sm">Email address</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-black rounded px-3 py-2"
                  placeholder="Email id"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="text-sm">Address (Optional)</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="mt-1 block w-full border border-black rounded px-3 py-2"
                placeholder="Address"
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-sm">How can we help?</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="mt-1 block w-full border border-black rounded px-3 py-2 h-32 resize-none"
                placeholder="Type your message..."
                required
              />
            </div>

            {/* Status Message */}
            {status && (
              <div
                className={`p-3 rounded ${
                  status.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                }`}
              >
                {status.message}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center mt-15">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#E25C26] text-white py-2 px-6 rounded-full hover:bg-orange-700 disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
