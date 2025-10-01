import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function BrandsSection() {
  const [section, setSection] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/api/home/brands/");
        if (Array.isArray(res.data) && res.data.length > 0) {
          setSection(res.data[0]); // latest section
        }
      } catch (err) {
        console.error("Failed to fetch brands section", err);
      }
    })();
  }, []);

  if (!section) return null;

  return (
    <section className="w-full py-10">
      <div className="mx-auto px-10 text-center">
        {/* Heading */}
        <h2 className="text-lg font-semibold text-[#E25C26] mb-8">
          {section.heading}
        </h2>

        {/* Logos row */}
        <div className="flex flex-wrap justify-center items-center gap-10 mb-10">
          {section.logos.map((logo) => (
            <div key={logo.id} className="h-16">
              <img
                src={logo.image}
                alt={logo.name || "brand"}
                className="h-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* CTA bar */}
        <div className="bg-[#E25C26] text-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-lg font-medium mb-4 md:mb-0">
            {section.cta_text}
          </p>
          <a
            href={`tel:${section.phone_number}`}
            className="bg-white text-black px-5 py-2 rounded-full font-bold shadow hover:bg-gray-100"
          >
            Call({section.phone_number})
          </a>
        </div>
      </div>
    </section>
  );
}
