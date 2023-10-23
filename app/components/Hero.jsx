"use client";
import React from "react";
import CurrencyConverter from "./CurrencyConverter";
import LagosParallel from "./LagosParallel";
import CurrentRates from "./CurrentRates";
import MarketNews from "./MarketNews";

const Hero = () => {
  return (
    <section className="m-auto w-[95%]">
      <div className="hero_grid w-[100%] mt-8">
        <div className="">
          <LagosParallel />
          <CurrentRates />
        </div>
        <div className="">
          <MarketNews />
        </div>
      </div>

      <CurrencyConverter />
    </section>
  );
};

export default Hero;
