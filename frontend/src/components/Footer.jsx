import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo1.png";
import igIcon from "../assets/instagram.png";
import gIcon from "../assets/google.png";
import locIcon from "../assets/location.png";
import phoneIcon from "../assets/phone.png";
import mailIcon from "../assets/mail.png";

export default function Footer() {
  return (
    <footer className="bg-[#CD3A00CC] text-white">
      <div className="mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand / Description */}
          <div>
            <img
              src={logo}
              alt="Electric dreams logo"
              className="h-14 w-auto mb-6"
            />
            <p className="text-sm md:text-base font-semibold max-w-xs">
              Voltaic Electrical provides expert residential, commercial, and
              emergency electrical services across Perth.
            </p>

            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <img
                  src={igIcon}
                  alt="Instagram"
                  className="h-8 w-8 object-contain"
                />
              </a>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google"
              >
                <img
                  src={gIcon}
                  alt="Google"
                  className="h-8 w-8 object-contain"
                />
              </a>
            </div>
          </div>

          {/* Services column */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-6">Services</h3>
            <ul className="space-y-1 font-semibold">
              <li className="text-sm md:text-base">
                <Link to="/services/lighting" className="hover:underline">
                  Lighting
                </Link>
              </li>
              <li className="text-sm md:text-base">
                <Link
                  to="/services/private-power-poles"
                  className="hover:underline"
                >
                  Private Power Poles
                </Link>
              </li>
              <li className="text-sm md:text-base">
                <Link
                  to="/services/smoke-alarms"
                  className="hover:underline"
                >
                  Smoke Alarms
                </Link>
              </li>
              <li className="text-sm md:text-base">
                <Link
                  to="/services/ev-chargers"
                  className="hover:underline"
                >
                  EV Chargers
                </Link>
              </li>
              <li className="text-sm md:text-base">
                <Link
                  to="/services/air-conditioning"
                  className="hover:underline"
                >
                  Air Conditioning
                </Link>
              </li>
              <li className="text-sm md:text-base">
                <Link
                  to="/services/thermographic-imaging"
                  className="hover:underline"
                >
                  Thermographic Imaging
                </Link>
              </li>
              <li className="text-sm md:text-base">
                <Link to="/services" className="hover:underline">
                  View All
                </Link>
              </li>
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-6">Company</h3>
            <ul className="space-y-1 font-semibold">
              <li className="text-sm md:text-base">
                <Link to="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li className="text-sm md:text-base">
                <Link to="/service-area" className="hover:underline">
                  Service Areas
                </Link>
              </li>
              <li className="text-sm md:text-base">
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
              <li className="text-sm md:text-base">
                <Link to="/reviews" className="hover:underline">
                  Reviews
                </Link>
              </li>
              <li className="text-sm md:text-base">
                <Link to="/resources" className="hover:underline">
                  Resources
                </Link>
              </li>
              <li className="text-sm md:text-base">
                <Link to="/sitemap" className="hover:underline">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-6">Get in Touch</h3>

            <div className="flex items-start gap-3 mb-2">
              <img
                src={locIcon}
                alt="Location"
                className="h-5 w-5 mt-1 object-contain"
              />
              <div className="text-sm md:text-base font-semibold">
                Location, Chennai
              </div>
            </div>

            <div className="flex items-start gap-3 mb-2">
              <img
                src={phoneIcon}
                alt="Phone"
                className="h-5 w-5 mt-1 object-contain"
              />
              <a
                href="tel:+911234567890"
                className="text-sm md:text-base font-semibold"
              >
                (+91)1234567890
              </a>
            </div>

            <div className="flex items-start gap-3">
              <img
                src={mailIcon}
                alt="Mail"
                className="h-5 w-5 mt-1 object-contain"
              />
              <a
                href="mailto:Support@electricdreams.com"
                className="text-sm md:text-base font-semibold"
              >
                Support@electricdreams.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
