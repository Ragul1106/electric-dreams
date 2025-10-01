import React from "react";
import img1 from "../assets/hero.jpg"; 
import img2 from "../assets/about1.jpg";
import img3 from "../assets/about2.jpg";

export default function About() {
  return (
    <div className="w-full px-2 md:px-4 lg:px-6">
      {/* Header Section */}
      <section className="py-12">
        <h2 className="text-xl md:text-3xl font-semibold text-[#CD3A00] mb-2">
          About Electric Dreams
        </h2>
        <p className="text-gray-700 text-lg md:text-2xl font-semibold leading-relaxed">
          We are here to provide tailored solutions that <br />
          meet your unique electrical needs.
        </p>
      </section>

      {/* Who we are */}
      <section className="grid md:grid-cols-2 gap-8 items-center mb-12">
        <img
          src={img1}
          alt="Team"
          className="w-full h-[380px] object-cover rounded-lg"
        />
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
            Who we are ?
          </h3>
          <p className="text-gray-700 mb-4 text-lg">
            Electric Dreams Group was founded with a passion for powering the
            community responsibly. We are a team of licensed Master Electricians
            and certified specialists in solar, air conditioning, and thermal
            imaging, dedicated to delivering the highest standard of service.
          </p>
          <ul className="text-gray-700 text-lg space-y-1 list-disc pl-5">
            <li>Electrical Contractors License: 12356</li>
            <li>Solar Accreditation Australia: S6783297</li>
            <li>Refrigeration License: L019876</li>
            <li>Communication License: T37634</li>
            <li>Cat1 Vibration Analysis</li>
            <li>Cat 1 Infrared Thermal Imaging</li>
            <li>Member of Master Electricians</li>
          </ul>
        </div>
      </section>

      {/* Our Services */}
      <section className="grid md:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
            Our Services
          </h3>
          <p className="text-gray-700 text-lg">
            Our comprehensive range of services is designed to address a wide
            variety of energy needs across residential, commercial, and
            industrial sectors. From electrical installations and solar systems
            to EV charging stations, thermal imaging, and industrial lighting,
            our goal is to offer solutions that not only meet immediate
            requirements but also support long-term sustainability. <br />
            <br />
            We work with leading brands like Clipsal, Tesla, and Solar Edge to
            ensure our clients receive the best products on the market. Whether
            you’re looking to save on energy costs, reduce environmental impact,
            or enhance your property’s value, we have the expertise and tools to
            make it happen.
          </p>
        </div>
        <img
          src={img2}
          alt="Services"
          className="w-full h-[340px] rounded-lg"
        />
      </section>

      {/* Our Commitment */}
      <section className="grid md:grid-cols-2 gap-8 items-center mb-12">
        <img
          src={img3}
          alt="Commitment"
          className="w-full h-[320px] rounded-lg"
        />
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
            Our Commitment to You
          </h3>
          <p className="text-gray-700 text-lg">
            At Electric Dreams Solutions Group, client satisfaction isn’t just a
            goal; it’s the foundation of our business. We’re committed to
            transparent communication, exceptional customer service, and
            craftsmanship that lasts. From the initial consultation to project
            completion, we keep our clients informed every step of the way,
            ensuring their questions are answered, timelines are clear, and
            expectations are met.
            <br />
            <br />
            Our reputation is built on trust and quality, and we take pride in
            every project we undertake. We’re here to make your transition to
            efficient, sustainable energy as smooth and rewarding as possible.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="rounded-xl bg-[#E25C26] py-6 mb-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4">
          <h4 className="text-white text-center
           font-semibold text-lg md:text-xl px-10">
            Get in Touch with Electric Dreams 
            <br />Electrical Today
          </h4>
          <a
            href="tel:+911234567890"
            className="bg-white text-orange-600 px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gray-100 transition"
          >
            Call: +91 1234567890
          </a>
        </div>
      </section>
    </div>
  );
}
