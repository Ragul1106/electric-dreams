// src/components/CallbackSection2.jsx
import React, { useEffect, useState } from "react";
import api from "../api/api"; // your axios instance

export default function CallbackSection2({ onMessageClick }) {
  const [data, setData] = useState({
    title: "Quality Workmanship",
    paragraphs: [
      "At electrical dreams, we understand that electrical emergencies can happen at any time. Whether it's a power outage, faulty wiring, sparking outlets, or an electrical hazard, our emergency electricians are ready to respond quickly to restore safety and functionality to your home or business.",
      "When you call us for an emergency electrical service, our licensed electricians will promptly assess the situation, identify the cause, and provide fast, effective repairs. We follow Australian safety standards and use high-quality equipment to resolve issues safely, preventing further risks or damage.",
      "Our lifetime workmanship warranty reflects our confidence in the reliability of our services. If you encounter electrical problems related to our repairs, we will be there to resolve them efficiently and professionally. Your safety is our top priority.",
      "Choose Adelaide Urban Electrical for reliable emergency electrical services and get the help you need—day or night. With our expert team, you can have peace of mind knowing your electrical issues will be resolved quickly and safely.",
    ],
    phone: "+611234567890",
    image:
      "https://images.unsplash.com/photo-1590490360189-528b0d4d4d6e?auto=format&fit=crop&w=1200&q=80",
  });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const resp = await api.get("/api/callback/section2/");
        const payload = resp.data && (resp.data || {});
        const result = payload.results ? payload.results[0] : payload;
        if (!cancelled && result) {
          // normalize paragraphs if string
          if (result.paragraphs && typeof result.paragraphs === "string") {
            try {
              result.paragraphs = JSON.parse(result.paragraphs);
            } catch {}
          }
          setData((d) => ({ ...d, ...result }));
        }
      } catch (e) {
        // keep defaults on error
      }
    }
    load();
    return () => (cancelled = true);
  }, []);

  const callNow = () => {
    if (data.phone) window.location.href = `tel:${data.phone}`;
  };

  const sendMessage = () => {
    if (onMessageClick) return onMessageClick();
    window.location.href = "/contact";
  };

  return (
    <section className="w-full mt-10">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-stretch">
        {/* Left text block */}
        <div className="lg:w-2/3 bg-[#2f78bf] text-white rounded-l-2xl p-8 md:p-12 flex flex-col justify-between">
          <div className="h-full">
            <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
              {data.title}
            </h2>

            <div className="max-w-3xl mx-auto text-center space-y-4">
              {data.paragraphs &&
                data.paragraphs.map((p, i) => (
                  <p key={i} className="text-sm md:text-base lg:text-md leading-relaxed">
                    {p}
                  </p>
                ))}
            </div>
          </div>

          <div className="mt-8 mb-2 flex flex-col sm:flex-row items-center justify-between gap-6">
            <button
              onClick={callNow}
              className="w-full sm:w-1/3 md:w-1/4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-full px-8 py-4 shadow-lg"
            >
              Call Now
            </button>

            <button
              onClick={sendMessage}
              className="w-full sm:w-1/3 md:w-1/4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-full px-8 py-4 shadow-lg"
            >
              Send a Message
            </button>
          </div>
        </div>

        {/* Right image block */}
        <div className="lg:w-1/3 w-full h-64 lg:h-auto">
          <img
            src={data.image}
            alt="team"
            className="w-full h-full object-contain rounded-r-2xl"
          />
        </div>
      </div>
    </section>
  );
}