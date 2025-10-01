import React from "react";

export default function ServiceAreas() {
  const areas = [
    "Ariyalur", "Chengalpattu", "Chennai",
    "Coimbatore", "Cuddalore", "Dharmapuri",
    "Dindigul", "Erode", "Kallakurichi",
    "Kancheepuram", "Kanniyakumari", "Karur",
    "Krishnagiri", "Madurai", "Mayiladuthurai",
    "Nagapattinam", "Namakkal", "Nilgiris",
    "Perambalur", "Pudukkottai", "Ramanathapuram",
    "Ranipet", "Salem", "Sivaganga",
    "Tenkasi", "Thanjavur", "Theni",
    "Thoothukudi", "Tiruchirappalli", "Tirunelveli",
    "Tirupathur", "Tiruppur", "Tiruvallur",
    "Tiruvannamalai", "Tiruvarur", "Vellore",
    "Villupuram", "Virudhunagar",
  ];

  return (
    <div className="w-full px-2 sm:px-4 md:px-6 bg-white">
      {/* Header */}
      <section className="text-center py-8 sm:py-10">
        <h2 className="text-[#E25C26] font-semibold text-lg sm:text-xl md:text-2xl mb-2">
          Areas we service
        </h2>
        <p className="text-gray-700 text-xs sm:text-sm md:text-base mx-auto max-w-2xl">
          Below are some areas we provide electrical services to. But, don’t
          worry if your area is not listed, we likely service your area too!
        </p>
      </section>

      {/* Areas Grid */}
      <section className="mb-10 sm:mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {areas.map((area, idx) => (
            <div
              key={idx}
              className="bg-gray-100 text-gray-800 text-center py-3 rounded-md shadow-sm text-xs sm:text-sm md:text-base font-medium transition-colors duration-300 cursor-pointer hover:bg-[#E25C26] hover:text-white"
            >
              {area}
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="rounded-xl bg-[#E25C26] py-6 mb-10">
        <div className="flex flex-col sm:flex-col md:flex-row items-center justify-between gap-4 px-4 sm:px-6 md:px-8">
          <h4 className="text-white text-center md:text-left font-semibold text-base sm:text-lg md:text-xl px-2 sm:px-6 md:px-10">
            Get in Touch with Electric Dreams 
            <br className="hidden sm:block" />Electrical Today
          </h4>
          <a
            href="tel:+911234567890"
            className="bg-white text-orange-600 px-6 py-2 sm:py-3 rounded-full font-semibold shadow-md hover:bg-gray-100 transition"
          >
            Call: +91 1234567890
          </a>
        </div>
      </section>
    </div>
  );
}
