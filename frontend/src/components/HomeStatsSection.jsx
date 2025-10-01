import React, { useEffect, useState } from "react";
import api from "../api/api";

import iconExperience from "../assets/experience.png";
import iconProjects from "../assets/projects.png";
import iconFixRate from "../assets/fixrate.png";
import iconSavings from "../assets/savings.png";

const statIcons = [iconExperience, iconProjects, iconFixRate, iconSavings];

export default function HomeStatsSection() {
  const [section, setSection] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/api/home/stats/");
        if (Array.isArray(res.data) && res.data.length > 0) {
          setSection(res.data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch stats section", err);
      }
    })();
  }, []);

  if (!section) return null;

  return (
    <section className="w-full bg-white">
      <h2 className="text-center text-[#E25C26] font-bold text-xl sm:text-2xl md:text-3xl pt-10 px-2">
        {section.heading}
      </h2>

      <div className="mx-auto px-2 md:px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0">
        {/* Left side: compact 2x2 image grid */}
        <div className="grid grid-cols-2 grid-rows-2 h-64 sm:h-80 md:h-[550px] gap-0">
          {[section.image1, section.image2, section.image3, section.image4].map(
            (img, i) =>
              img ? (
                <img
                  key={i}
                  src={img}
                  alt={`grid-${i}`}
                  className="w-full h-full object-cover rounded-sm"
                />
              ) : (
                <div key={i} className="w-full h-full bg-gray-200 rounded-sm" />
              )
          )}
        </div>

        {/* Right side: stats section */}
        <div className="flex flex-col justify-center items-center bg-[#0056b3] p-4 sm:p-6 h-[780px] md:h-[550px] rounded-sm">
          <h2 className="text-md sm:text-lg md:text-xl font-semibold text-white mb-4 sm:mb-6 text-center max-w-[90%]">
            {section.title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-[600px]">
            {section.stats.map((stat, index) => (
              <div
                key={stat.id}
                className="bg-white rounded-md shadow p-3 sm:p-4 flex flex-col items-start"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border-4 border-gray-500 rounded">
                    <img
                      src={statIcons[index] || iconExperience}
                      alt="icon"
                      className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                    />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">
                    {stat.value}
                  </span>
                </div>
                <h3 className="mt-2 sm:mt-3 font-semibold text-gray-800 text-sm sm:text-base">
                  {stat.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-600">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
