import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function CallbackSection3() {
  const [data, setData] = useState({
    banner_title: "Get in Touch with Electric Dreams Electrical Today",
    phone: "(+91)1234567890",
    section_title: "Signs you need an emergency electrician",
    intro: "Many signs indicate when it’s time to call a 24 hour electrician for help with your electrical problems. Here’s a quick list of what to look for:",
    points: [
      "Smoke coming out of your outlets — Smoke from power outlets can signify that the wiring in your home or business is faulty and needs to be replaced. If you don’t have an after-hours electrician on hand to inspect the problem, it could cause a fire. If you see smoke or hear crackling sounds from an outlet, turn off the power at the breaker box and call an expert.",
      "Smell of burning electronics — When you suddenly smell burning electronics, something might be wrong with your electrical system. If the smell is strong and seems to be coming from more than one device in your home, it’s time to call an emergency electrician.",
      "Sudden isolated loss of power — If there is a sudden loss of power over a small area or within one room of your home, this could be due to a short circuit or blown fuse, or it could result from faulty wiring that needs to be repaired immediately.",
      "Circuit breaker keeps tripping or resetting — Circuit breakers are supposed to trip when they sense too much current, but if they trip too often, there might be something wrong with the wiring, or your breaker may be faulty."
    ]
  });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const resp = await api.get("/api/callback/section3/");
        const payload = resp.data?.results ? resp.data.results[0] : resp.data;
        if (!cancelled && payload) setData((d) => ({ ...d, ...payload }));
      } catch {
        // keep defaults if API fails
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="w-full mb-10">
      {/* Orange top bar */}
      <div className="bg-orange-600 text-white flex flex-col md:flex-row items-center justify-between rounded-2xl px-6 py-6 md:py-8 max-w-[1400px] mx-auto my-10">
        <h2 className="text-xl md:text-2xl font-bold text-center md:text-left">
          {data.banner_title}
        </h2>
        <a
          href={`tel:${data.phone}`}
          className="mt-4 md:mt-0 bg-white text-orange-600 font-semibold rounded-full px-6 py-3 shadow-md"
        >
          Call {data.phone}
        </a>
      </div>

      {/* Blue content box */}
      <div className="bg-[#2f78bf] text-white rounded-b-2xl px-6 md:px-10 py-10 max-w-[1400px] mx-auto">
        <h3 className="text-center text-2xl md:text-3xl font-bold mb-6">
          {data.section_title}
        </h3>
        <p className="text-center mb-6 text-sm md:text-base lg:text-lg">
          {data.intro}
        </p>
        <ul className="list-disc list-inside space-y-4 max-w-5xl mx-auto text-sm md:text-base lg:text-lg leading-relaxed">
          {data.points?.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}