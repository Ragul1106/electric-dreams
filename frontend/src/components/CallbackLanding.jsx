// src/components/HomeLanding.jsx
import React, { useEffect, useState } from "react";
import api from "../api/api"; // axios instance with baseURL = VITE_API_BASE_URL (e.g. http://localhost:8000/api/)
import CallbackRequest from "./CallbackRequest"; // your existing form component
import icon0 from "../assets/icon-0.png";
import icon1 from "../assets/icon-1.png";
import icon2 from "../assets/icon-2.png";
import icon3 from "../assets/icon-3.png";
import icon4 from "../assets/icon-4.png";

const ICONS = [icon0, icon1, icon2, icon3, icon4];

export default function CallbackLanding() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api
      .get("/api/callback/section1/")
      .then((res) => {
        if (!mounted) return;
        setData(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch homepage:", err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => (mounted = false);
  }, []);

  if (loading) {
    return <div className="py-12 text-center">Loading…</div>;
  }
  if (!data) {
    return <div className="py-12 text-center">No data configured</div>;
  }

  const {
    banner,
    title,
    subtitle,
    stars_count,
    reviews_text,
    call_image,
    phone_number,
    feature_cards,
  } = data;

  return (
    <div className="container mx-auto ">
      {/* 1. Banner */}
      {banner && (
        <div className="w-full h-64 md:h-150 overflow-hidden rounded-b-lg">
          <img
            src={banner}
            alt="banner"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* 2. Main row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 items-start">
        {/* left side (col-span 2 on md) */}
        <div className="md:col-span-2">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">{title}</h2>
          <p className="text-xl text-gray-700 mb-4 lg:pr-56">{subtitle}</p>

          {/* stars + reviews */}
          <div className="flex flex-col items-start gap-2 mb-6">
            <div className="flex items-center">
              {Array.from({ length: stars_count || 5 }).map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.956c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.968 2.677c-.784.57-1.84-.197-1.54-1.118l1.287-3.956a1 1 0 00-.364-1.118L2.043 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                </svg>
              ))}
            </div>
            <div className="text-sm text-orange-600 font-medium">{reviews_text}</div>
          </div>


          {/* image + call button */}
          <div className="flex flex-col sm:flex-row items-center gap-20">
            {call_image && (
              <img
                src={call_image}
                alt="call"
                className="w-[350px] h-[300px] object-cover rounded-md shadow"
              />
            )}
            <div>
              <button className="bg-orange-600 text-white font-semibold px-6 py-3 rounded-full shadow">
                Call: {phone_number}
              </button>
            </div>
          </div>
        </div>

        {/* right side: Callback form (imported) */}
        <div>
          {/* The CallbackRequest component already styled earlier — just render it */}
          <CallbackRequest />
        </div>
      </div>

      {/* 3. Feature cards row */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {Array.isArray(feature_cards) && feature_cards.length > 0
          ? feature_cards.map((card, idx) => {
              const icon = ICONS[card.icon_index ?? idx % ICONS.length];
              return (
                <div key={idx} className="border rounded-xl p-4 text-center shadow-sm hover:shadow-md">
                  {icon && <img src={icon} alt={card.title} className="w-12 h-12 mx-auto mb-3" />}
                  <h4 className="text-sm font-semibold">{card.title}</h4>
                  {card.subtitle && <p className="text-xs text-gray-600 mt-1">{card.subtitle}</p>}
                </div>
              );
            })
          : // fallback UI if none
            [0,1,2,3,4].map((i) => (
              <div key={i} className="border rounded-xl p-4 text-center">
                <img src={ICONS[i]} alt="icon" className="w-12 h-12 mx-auto mb-3" />
                <h4 className="text-sm font-semibold">Feature {i+1}</h4>
                <p className="text-xs text-gray-600 mt-1">Description</p>
              </div>
            ))}
      </div>
    </div>
  );
}
