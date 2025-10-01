// src/components/ServicesCarousel.jsx
import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function ServicesCarousel({ viewAllHref = "/services" }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.get("/api/home/services/");
        if (!mounted) return;
        if (Array.isArray(res.data) && res.data.length > 0) {
          setServices(res.data);
          return;
        }
      } catch (err) {
        console.error("Failed to fetch services", err);
      }
      if (mounted) setServices([]);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (!services.length) {
    return (
      <section className="w-full bg-white py-10">
        <div className="mx-auto px-10 text-center">
          <h2 className="text-lg lg:text-3xl font-semibold mb-1">Our services</h2>
          <p className="text-sm text-gray-500">No services available</p>
        </div>
      </section>
    );
  }

  const display = [...services, ...services];
  const durationSec = Math.max(18, services.length * 3);

  const handleViewAll = () => {
    if (typeof window !== "undefined") window.location.href = viewAllHref;
  };

  return (
    <section className="w-full bg-white py-8">
      <div className="mx-auto px-4 md:px-10">
        {/* Title */}
        <div className="mb-4">
          <h2 className="text-lg lg:text-2xl text-center font-semibold">Our services</h2>
        </div>

        <div className="relative overflow-hidden">
          <style>{`
            @keyframes slide-left {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .services-track {
              display: flex;
              gap: 1rem;
              will-change: transform;
              animation: slide-left ${durationSec}s linear infinite;
            }
            .services-track:hover {
              animation-play-state: paused;
            }
          `}</style>

          {/* Marquee track */}
          <div className="services-track" style={{ alignItems: "stretch" }}>
            {display.map((s, idx) => (
              <div
                key={`${s.id}-${idx}`}
                className="min-w-[240px] max-w-[280px] flex-shrink-0 relative"
              >
                <article className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 relative">
                  <div className="h-32 w-full overflow-hidden rounded-t-2xl bg-gray-100">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="bg-[#0D56A5] text-white p-3 rounded-b-2xl h-32 flex flex-col justify-between relative">
                    {/* Title + absolute arrow */}
                    <div className="relative">
                      <h3 className="font-semibold text-sm lg:text-base">
                        {s.title}
                      </h3>
                      <span className="absolute right-2 top-10 transform translate-x-1/2 -translate-y-1/2 w-10 h-6 lg:w-7 lg:h-7 bg-white rounded-full flex items-center justify-center text-[#0D56A5] font-bold">
                        →
                      </span>
                      <p className="text-xs text-white/90 mt-1 pr-6">{s.subtitle}</p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Central common button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleViewAll}
            className="bg-[#E25C26] text-white px-8 py-2 rounded-full text-sm lg:text-base shadow hover:bg-orange-600 transition"
          >
            View Services
          </button>
        </div>
      </div>
    </section>
  );
}
