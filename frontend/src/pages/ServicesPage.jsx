import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoCallOutline } from "react-icons/io5";
import api from "../api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ServicesPage() {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [contact, setContact] = useState({
    name: "",
    last: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const formRef = useRef(null);

  const { type } = useParams(); // ✅ get param from URL
  const urlType = (type || "").trim().toLowerCase();

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await api.get("/api/sections/");
        if (mounted) setSections(res.data || []);
      } catch (err) {
        console.error("Failed to load sections", err);
        toast.error("❌ Failed to load sections");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const submitContact = async (e) => {
    e.preventDefault();

    if (!contact.name?.trim()) {
      toast.warn("⚠️ Please enter your first name");
      return;
    }
    if (!contact.message?.trim()) {
      toast.warn("⚠️ Please enter a message");
      return;
    }

    setSending(true);
    try {
      await api.post("/api/contactmessages/", {
        name: `${contact.name} ${contact.last}`.trim(),
        email: contact.email,
        phone: contact.phone,
        address: contact.address,
        message: contact.message,
      });

      toast.success("✅ Message sent! Check your email for confirmation.");
      setContact({ name: "", last: "", email: "", phone: "", address: "", message: "" });
      if (formRef.current) formRef.current.reset();
    } catch (err) {
      console.error("Failed to send contact message:", err);
      const serverMsg =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err?.message ||
        "❌ Failed to send message.";
      toast.error(serverMsg);
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading…</div>;

  const normalize = (s) => (s || "").toString().trim().toLowerCase();
  const filteredSections =
    urlType !== "" ? sections.filter((sec) => normalize(sec.title).includes(urlType)) : sections;
  const showNoMatchMessage = urlType && filteredSections.length === 0;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme="colored" />

        {/* 🚫 Removed filter buttons */}

        {showNoMatchMessage && (
          <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded">
            <strong>No results for "{urlType}"</strong>. Try a different service category.
          </div>
        )}

        {filteredSections.map((section) => (
          <section key={section.id} className="mb-12">
            {/* Section header */}
            <div className="bg-blue-600 text-white rounded-lg p-6 mb-6 relative overflow-hidden">
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold">{section.title}</h2>
                  <p className="mt-2 text-sm md:text-base">{section.subtitle}</p>
                </div>
                {section.image && (
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-full ring-4 ring-white overflow-hidden">
                    <img src={section.image} alt={section.title} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            {/* Services list */}
            {/* Services list */}
            <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 max-w-6xl mx-auto">
              {section.services.map((svc, idx) => {
                const isDisabled = idx !== 0; // ✅ only first card active

                return (
                  <article
                    key={svc.id}
                    className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col ${isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:shadow-lg cursor-pointer transition"
                      }`}
                    onClick={() => {
                      if (!isDisabled) {
                        navigate(`/services/${section.title.toLowerCase()}/${svc.id}`);
                      }
                    }}

                  >
                    <div className="w-full h-48 bg-gray-100 overflow-hidden">
                      {svc.image ? (
                        <img
                          src={svc.image}
                          alt={svc.title}
                          className="w-full h-100 object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="bg-[#0056B3] text-white p-4 flex items-center rounded-b-lg">
                      <div className="w-3/4 pr-3">
                        <h3 className="font-semibold text-lg leading-tight">{svc.title}</h3>
                        <p className="text-sm text-white/90 mt-1 leading-snug">
                          {svc.excerpt}
                        </p>
                      </div>
                      <div className="w-1/4 flex justify-end">
                        <button
                          disabled={isDisabled}
                          className={`w-10 h-10 rounded-full flex items-center justify-center shadow ${isDisabled
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-white text-blue-600 hover:scale-95 transition-transform"
                            }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.21 4.21a.75.75 0 011.06 0L13.5 9.66a.75.75 0 010 1.06l-5.23 5.45a.75.75 0 11-1.07-1.05L11.69 10 7.21 5.27a.75.75 0 010-1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>


            {/* Contact form */}
            <div className="mt-12 bg-[#CD3A00CC] text-white rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {/* Left info */}
                <div className="md:col-span-1">
                  <h4 className="font-semibold text-sm tracking-wide">Get in Touch</h4>
                  <p className="mt-3 text-3xl font-extrabold">Contact Electric Dreams</p>
                  <div className="mt-8 space-y-6">
                    <div className="flex items-center gap-5 bg-white rounded-2xl p-5 shadow-sm">
                      <div className="flex items-center justify-center w-14 h-14 bg-[#CD3A00] rounded-full flex-shrink-0">
                        <IoCallOutline className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-black">Call us 24/7</div>
                        <div className="mt-1 text-sm text-black/90">
                          {section?.contact_phone || "(+91)1234567890"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 bg-white rounded-2xl p-5 shadow-sm">
                      <div className="flex items-center justify-center w-14 h-14 bg-[#CD3A00] rounded-full flex-shrink-0">
                        <IoCallOutline className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-black">Callout free</div>
                        <div className="mt-1 text-sm text-black/90">During business hours (7:00 AM–5:00 PM)</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div className="md:col-span-2">
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-white/30">
                    <form ref={formRef} onSubmit={submitContact} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                        <input
                          name="name"
                          value={contact.name}
                          onChange={handleContactChange}
                          required
                          placeholder="First name"
                          className="w-full h-12 px-4 rounded-lg border-2 border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#CD3A00]/30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                        <input
                          name="last"
                          value={contact.last}
                          onChange={handleContactChange}
                          placeholder="Last name"
                          className="w-full h-12 px-4 rounded-lg border-2 border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#CD3A00]/30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        <input
                          name="phone"
                          value={contact.phone}
                          onChange={handleContactChange}
                          placeholder="Phone number"
                          className="w-full h-12 px-4 rounded-lg border-2 border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#CD3A00]/30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email address</label>
                        <input
                          name="email"
                          type="email"
                          value={contact.email}
                          onChange={handleContactChange}
                          placeholder="Email id"
                          className="w-full h-12 px-4 rounded-lg border-2 border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#CD3A00]/30"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Address (Optional)</label>
                        <input
                          name="address"
                          value={contact.address}
                          onChange={handleContactChange}
                          placeholder="Address"
                          className="w-full h-12 px-4 rounded-lg border-2 border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#CD3A00]/30"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">How can we help?</label>
                        <textarea
                          name="message"
                          value={contact.message}
                          onChange={handleContactChange}
                          rows="5"
                          placeholder="Type your message..."
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#CD3A00]/30"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <button
                          type="submit"
                          disabled={sending}
                          className={`w-full h-12 cursor-pointer rounded-full text-white text-lg font-semibold transition ${sending ? "bg-gray-400 cursor-not-allowed" : "bg-[#CD3A00CC] hover:bg-[#b83600]"
                            }`}
                        >
                          {sending ? "Sending..." : "Send Message"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
