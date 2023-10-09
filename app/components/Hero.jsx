"use client";
import React from "react";
import MySwiper from "./MySwiper";
import CurrencyConverter from "./CurrencyConverter";
import Markets from "./Markets";
import FeaturedNews from "./FeaturedNews";
import CTA from "./CTA";

const Hero = () => {
  return (
    <section className="m-auto">
      <MySwiper />
      <CurrencyConverter />
      <Markets />
      <FeaturedNews />
      <CTA />
    </section>
  );
};

export default Hero;
