"use client";
import React from "react";
import CurrencyConverter from "./CurrencyConverter";
import CTA from "./CTA";
import LagosParallel from "./LagosParallel";
import CurrentRates from "./CurrentRates";

const Hero = () => {
  return (
    <section className="m-auto">
      <div className="flex items-center justify-between">
        <LagosParallel className=""/>
        <CurrentRates className=""/>
      </div>
      <CurrencyConverter />
      <CTA />
    </section>
  );
};

export default Hero;
