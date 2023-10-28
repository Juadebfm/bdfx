"use client";

import React from "react";
import LagosParallel from "../components/LagosParallel";
import CurrentRates from "../components/CurrentRates";
import MarketNews from "../components/MarketNews";

const Analytics = () => {
  return (
    <main>
      <LagosParallel />
      <CurrentRates />
      <div className="mt-12">
        <MarketNews />
      </div>
    </main>
  );
};

export default Analytics;
