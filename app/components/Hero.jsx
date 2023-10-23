"use client";
import React from "react";
import CurrencyConverter from "./CurrencyConverter";
import CTA from "./CTA";
import LagosParallel from "./LagosParallel";
import CurrentRates from "./CurrentRates";

const Hero = () => {
  return (
    <section className="m-auto w-[90%]">
      <div className="grid grid-cols-2 place-items-center w-[100%] mt-8">
        <LagosParallel/>
        <CurrentRates/>
      </div>
      <CurrencyConverter />
      <CTA />
    </section>
  );
};

export default Hero;
