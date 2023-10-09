"use client"

import React from "react";
import Markets from "../components/Markets";
import FeaturedNews from "../components/FeaturedNews";
import CTA from "../components/CTA";

const BusinessNews = () => {
  return (
    <main>
      <Markets />
      <FeaturedNews />
      <CTA />
    </main>
  );
};

export default BusinessNews;
