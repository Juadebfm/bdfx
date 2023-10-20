"use client";
import React from "react";
import CurrencyConverter from "./CurrencyConverter";
import CTA from "./CTA";

const Hero = () => {
  return (
    <section className="m-auto">
      <CurrencyConverter />
      <CTA />
    </section>
  );
};

export default Hero;
