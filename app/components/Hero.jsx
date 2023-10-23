"use client";
import React from "react";
import CurrencyConverter from "./CurrencyConverter";
import CTA from "./CTA";
import LagosParallel from "./LagosParallel";
import CurrentRates from "./CurrentRates";

const Hero = () => {
  return (
    <section className="m-auto">
      <div className="grid grid-cols-2 place-items-center gap-5 h-[500px]">
        <LagosParallel className="border border-black h-[500px]"/>
        <CurrentRates className="border border-black h-[500px]"/>
      </div>
      <CurrencyConverter />
      <CTA />
    </section>
  );
};

export default Hero;
