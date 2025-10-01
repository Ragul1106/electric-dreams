import React, { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner";
import HomeStatsSection from "../components/HomeStatsSection";
import ThreeStepProcess from "../components/ThreeStepProcess";
import ReviewsSection from "../components/ReviewsSection";
import BrandsSection from "../components/BrandsSection";
import FAQSection from "../components/FAQSection";
import ServicesCarousel from "../components/ServicesCarousal";

export default function Home() {
  

  return (
    <div className="w-full mt-10">
      <HeroBanner />
      <ServicesCarousel />
      <HomeStatsSection />
      <ThreeStepProcess />
      <ReviewsSection />
      <BrandsSection />
      <FAQSection />
    </div>
  );
}
