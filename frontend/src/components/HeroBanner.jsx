// src/components/HeroBanner.jsx
import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function HeroBanner() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.get("/api/home/hero/");
        const list = Array.isArray(res.data) ? res.data : [];
        const latest = list.length > 0 ? list[0] : null;
        if (mounted) setData(latest);
      } catch (err) {
        console.error("Failed to load hero data", err);
        if (mounted) {
          setData({
            bg_img: "",
            hero_img: "",
            hero_title: "Your Trusted Experts for All Things Electrical",
            hero_subtitle:
              "From residential upgrades to large-scale commercial projects, we deliver expert service, quality workmanship, and reliable results.",
          });
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const bgSrc = data?.bg_img || "";
  const heroSrc = data?.hero_img || "";

  return (
    <section className="w-full flex justify-center relative">
      <div className="relative max-w-[1200px] w-full px-4 sm:px-6 lg:px-8">
        {bgSrc && (
  <div className="relative w-full">
    <img
      src={bgSrc}
      alt="background"
      className="w-[900px] h-[260px] md:h-[380px] lg:h-[520px] rounded-md mx-auto"
      style={{ filter: "saturate(95%)" }}
    />
  </div>
)}


        {/* Hero image overlapping blob */}
{heroSrc && (
  <div className="absolute -top-[120px] inset-x-0 flex justify-center pointer-events-none">
    <div className="w-full max-w-[900px]">
      <img
  src={heroSrc}
  alt="hero"
  className="pointer-events-none object-contain w-[500px] sm:w-[600px] md:w-[550px] lg:w-[600px] mx-auto"
/>

    </div>
  </div>
)}


        {/* Black overlay box with content */}
        <div className="relative -mt-12 sm:-mt-16 md:-mt-20">
          <div className="mx-auto max-w-[1000px]">
            <div
              className="bg-black/80 text-center rounded-md px-6 py-6 md:py-2 relative"
              style={{ boxShadow: "0 20px 0 rgba(0,0,0,0.12)" }}
            >
              <h2 className="text-[#E25C26] font-semibold text-lg sm:text-xl md:text-2xl">
                {loading ? " " : data?.hero_title || ""}
              </h2>
              <p className="mt-4 text-white text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                {loading ? " " : data?.hero_subtitle || ""}
              </p>
            </div>
          </div>
        </div>

        {/* bottom shadow strip for lift effect */}
        <div className="mx-auto max-w-[1000px] mt-6">
          <div
            className="h-4 rounded-b-md"
            style={{
              filter: "blur(14px)",
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.18))",
            }}
          />
        </div>
      </div>
    </section>
  );
}
