import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function ThreeStepProcess() {
  const [section, setSection] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // list endpoint returns array; pick latest (first) if exists
        const res = await api.get("/api/home/steps/");
        if (!mounted) return;
        const list = Array.isArray(res.data) ? res.data : [];
        const latest = list.length > 0 ? list[0] : null;
        setSection(latest);
      } catch (err) {
        console.error("Failed to load steps section", err);
      }
    })();
    return () => (mounted = false);
  }, []);

  if (!section) return null;

  // build array of step objects from the single-model fields
  const steps = [
    {
      id: 1,
      number: section.step1_number || "1",
      title: section.step1_title || "",
      description: section.step1_description || "",
    },
    {
      id: 2,
      number: section.step2_number || "2",
      title: section.step2_title || "",
      description: section.step2_description || "",
    },
    {
      id: 3,
      number: section.step3_number || "3",
      title: section.step3_title || "",
      description: section.step3_description || "",
    },
  ];

  return (
    <section className="w-full bg-white py-10">
      <div className=" mx-auto px-4">
        <h2 className="text-center text-xl md:text-3xl font-semibold mb-8">
          {section.heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-2 lg:px-20">
          {steps.map((step) => (
            <div
              key={step.id}
              className="border-4 border-[#E25C26] rounded-md p-6 flex flex-col"
            >
              <div className="text-3xl font-bold text-center text-gray-600">
                {step.number}
              </div>

              <h3 className="mt-3 font-semibold text-gray-900">{step.title}</h3>

              <p className="mt-3 text-sm text-gray-600 flex-1">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
