import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function FAQSection() {
  const [section, setSection] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/api/home/faqs/");
        if (Array.isArray(res.data) && res.data.length > 0) {
          setSection(res.data[0]); // latest FAQ section
        }
      } catch (err) {
        console.error("Failed to fetch FAQs", err);
      }
    })();
  }, []);

  if (!section) return null;

  return (
    <section className="w-full py-10 bg-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
          {section.heading}
        </h2>
        {section.subheading && (
          <p className="mt-2 text-gray-600">{section.subheading}</p>
        )}

        {/* FAQ list */}
        <div className="mt-8 space-y-4 text-left">
          {section.faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-[#d9d9d9] border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <h3 className="font-semibold text-gray-900">{faq.question}</h3>
              <p className="mt-1 text-sm text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
