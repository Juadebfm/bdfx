"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Flootbar from "./Flootbar";

const Navbar = () => {
  // Get FlootBar Data
  //Use State For Data Set
  const [data, setData] = useState(null);

  const apiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;

  //Use Effect
  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.currencybeacon.com/v1/latest?api_key=${apiKey}`;
      const options = {
        method: "GET",
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json(); // Parse the response as JSON
        setData(result); // Set the data in state
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [apiKey]);

  return (
    <>
      <nav className="flex items-center justify-between px-[5rem] py-5">
        <div className="font-extrabold text-[28px] font-rubikFont">
          <Link href="/">BDFX</Link>
        </div>
        <div className="flex items-center justify-center gap-8 font-latoFont text-[17px]">
          <Link href="rates">Rates</Link>
          <Link href="businessnews">Business News</Link>
          <Link href="cryptorates">Crypto Rates</Link>
          <Link href="analytics">Analytics</Link>
          <Link href="contact">Contact</Link>
        </div>
        <button className="bg-mainRed text-mainWhite py-[12px] px-[14px] w-[150px] text-center hover:bg-mainRed/80 cursor-pointer text-[17px]">
          Signup
        </button>
      </nav>
      <Flootbar data={data} />
    </>
  );
};

export default Navbar;
