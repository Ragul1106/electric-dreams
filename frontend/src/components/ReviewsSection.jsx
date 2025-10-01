import React, { useEffect, useState } from "react";
import api from "../api/api";

function StarIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.539 1.118L10 13.348l-3.493 2.617c-.784.57-1.839-.197-1.54-1.118l1.286-3.96a1 1 0 00-.364-1.118L2.495 9.387c-.783-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.286-3.96z" />
    </svg>
  );
}

export default function ReviewsSection() {
  const [section, setSection] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/api/home/reviews/");
        if (Array.isArray(res.data) && res.data.length > 0) {
          setSection(res.data[0]); // latest reviews section
        }
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    })();
  }, []);

  if (!section) return null;

  return (
    <section className="w-full bg-[#0056b3] text-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-semibold">{section.heading}</h2>
          {section.subheading && (
            <p className="mt-2 text-sm md:text-base text-white/90 max-w-3xl mx-auto">
              {section.subheading}
            </p>
          )}
        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {section.reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-lg p-5 text-gray-800 shadow-md flex flex-col"
            >
              {/* stars */}
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: Math.min(5, r.stars || 0) }).map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                ))}
              </div>

              {/* review text */}
              <p className="text-sm leading-relaxed flex-1">{r.text}</p>

              {/* reviewer */}
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                  {r.person_image ? (
                    <img
                      src={r.person_image}
                      alt={r.person_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {r.person_name}
                  </div>
                   <div className="text-sm font-semibold text-gray-900">{r.service}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
