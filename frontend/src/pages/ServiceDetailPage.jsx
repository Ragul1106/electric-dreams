import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCallOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import axios from "../api/api"; // ✅ your axios instance

export default function ServiceDetailPage() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("api/servicesdetail/") 
      .then((res) => {
        setServices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching services:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center p-10">Loading services...</p>;
  if (!services.length) return <p className="text-center text-red-500">No services available</p>;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-[#CD3A00CC] text-white mt-10 w-5xl mx-auto py-6 px-6 text-center font-bold text-lg">
        <span className="px-3 py-1 rounded-lg mr-2">Lighting Installation</span>
        <span className="text-xl">Book Online or Call to Book Your Services</span>
      </div>

      <h3 className="text-left max-w-6xl mx-50 text-2xl font-bold mt-8">
        Wall and Ceiling Light
      </h3>

      {/* Services List */}
      <div className="max-w-7xl mx-auto py-10 px-4 grid md:grid-cols-2 gap-10">
        {services.map((svc) => (
          <div
            key={svc.id}
            onClick={() => navigate(`/services/lighting/${svc.id}`)} // ✅ navigate with id
            className="cursor-pointer border rounded-xl flex justify-between items-start p-4 hover:shadow-md transition"
          >
            {/* Left Content */}
            <div className="flex-1 pr-4">
              <h3 className="font-medium text-base text-gray-800">{svc.title}</h3>
              <div className="flex items-center gap-1 mt-2 text-gray-600 text-sm">
                <FaStar className="text-white rounded-full bg-blue-600 p-1 w-5 h-5" />
                <span className="font-semibold underline">{svc.rating}</span>
                <span className="ml-1 underline">({svc.reviews_count} reviews)</span>
              </div>
              <div className="mt-2 text-sm">
                <span className="font-semibold text-black">{svc.price}</span>
                <span className="ml-2 text-gray-500">• {svc.duration}</span>
              </div>
              <button className="mt-2 text-sm text-[#CD3A00] font-medium hover:underline">
                View Details
              </button>
            </div>

            {/* Right Content */}
            <div className="flex flex-col items-center">
              <img src={svc.image} alt={svc.title} className="w-16 h-16 object-contain" />
              <button className="mt-3 bg-[#CD3A00] text-white text-xs px-4 py-1 rounded-full hover:bg-[#b83600]">
                Add
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="bg-[#CD3A00] text-white py-6 px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-xl font-bold mb-4 md:mb-0">
          Get in Touch with Electric Dreams Electrical Today
        </p>
        <a
          href="tel:+911234567890"
          className="flex items-center gap-2 bg-white text-[#CD3A00] font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100"
        >
          <IoCallOutline className="w-5 h-5" />
          Call +91 1234567890
        </a>
      </div>
    </div>
  );
}
