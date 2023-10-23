"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import format from "date-fns/format";
import Link from "next/link";
import { BiMenu, BiX } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const logoImg =
  "https://res.cloudinary.com/juadeb/image/upload/v1696431204/BDFX/bdfx_fx_tts8nv.png";

// List of currencies separated by commas
const currencies =
  "AED, AFN, ALL, AMD, ANG, AOA, ARS, AUD, AWG, AZN, BAM, BBD, BDT, BGN, BHD, BIF, BMD, BND, BOB,BRL, BSD, BTN, BWP, BYN, BZD, CAD, CDF, CHF, CLF, CLP, CNY, COP, CRC, CUC, CUP, CVE, CZK, DJF, DKK, DOP, DZD, EGP, ERN, ETB, EUR, FJD, FKP, GBP, GEL, GHS, GIP, GMD, GNF, GTQ, GYD, HKD, HNL, HRK, HTG, HUF, IDR, ILS, INR, IQD, IRR, ISK, JMD, JOD, JPY, KES, KGS, KHR, KMF, KPW, KRW, KWD, KYD, KZT, LAK, LBP, LKR, LRD, LSL, LTL, LVL, LYD, MAD, MDL, MGA, MKD, MMK, MNT, MOP, MRO, MUR, MVR, MWK, MXN, MYR, MZN, NAD, NGN, NIO, NOK, NPR, NZD, OMR, PAB, PEN, PGK, PHP, PKR, PLN, PYG, QAR, RON, RSD, RUB, RWF, SAR, SBD, SCR, SDG, SEK, SGD, SHP, SLL, SOS, SRD,STD, SVC, SYP, SZL, THB, TJS, TMT, TND, TOP, TRY, TTD, TWD, TZS, UAH, UGX, USD, UYU, UZS, VEF, VND, VUV, WST, XAF, XCD, XOF, XPF, YER, ZAR, ZMW, ZWL";

// Base currency
const baseCurrency = "NGN"; // The base currency for conversion

const apiKey = "BntwBy7KMtxjffTe21o6I2ESYMNZBcGP"; // Your API key

// Initialize the currency data array from local storage or as an empty array
let currencyData = [];

// Function to add a new conversion to the array and update local storage
const addConversionToData = (fromCurrency, toCurrency, value) => {
  // Create a new conversion object
  const newConversion = {
    from: fromCurrency,
    to: toCurrency,
    value: value,
  };

  // Push the new conversion to the currencyData array
  currencyData.push(newConversion);

  // Safely update local storage with the updated array
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("currencyData", JSON.stringify(currencyData));
  }
};

// Function to check if the last API call was made within the last 24 hours
function isLastApiCallWithin24Hours() {
  if (typeof localStorage !== "undefined") {
    const lastApiCallTimestamp = localStorage.getItem("lastApiCallTimestamp");

    if (!lastApiCallTimestamp) {
      // If there is no previous timestamp, the API call has never been made
      return false;
    }

    const currentTime = new Date().getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    return currentTime - parseInt(lastApiCallTimestamp, 10) < twentyFourHours;
  }

  return false;
}

const convertCurrency = async (fromCurrency, toCurrency) => {
  if (!isLastApiCallWithin24Hours()) {
    // If the last API call was not within the last 24 hours, make the call
    const apiUrl = `https://api.currencybeacon.com/v1/convert?from=${toCurrency}&to=${fromCurrency}&amount=1&api_key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // Step 2: Add the new conversion to the currencyData array and update local storage
      addConversionToData(fromCurrency, toCurrency, data.value);
      // Update the last API call timestamp in local storage
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(
          "lastApiCallTimestamp",
          new Date().getTime().toString()
        );
      }
    } catch (error) {
      console.error(
        `Error converting ${fromCurrency} to ${toCurrency}:`,
        error
      );
    }
  }
};

// Loop through the list of currencies and make API requests
const currencyList = currencies.split(",");
const targetCurrency = "NGN"; // Start with NGN as the target currency
currencyList.forEach(async (currency) => {
  if (currency !== targetCurrency) {
    await convertCurrency(baseCurrency, currency);
  }
});

const Navbar = () => {
  const pathname = usePathname();
  const [currentDate, setCurrentDate] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navMenuRef = useRef(null); // Create a reference to the navigation menu

  const scrollThreshold = 200; // Adjust the threshold as needed (in pixels)

  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      // When the user has scrolled down beyond the threshold
      navMenuRef.current.style.position = "fixed";
      navMenuRef.current.style.top = "0";
    } else {
      // When the user is above the thr3shold
      navMenuRef.current.style.position = "static"; // or "relative" if you prefer
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const today = new Date();
    const formattedDate = format(today, "EEEE, MMMM dd, yyyy"); // Format the date
    setCurrentDate(formattedDate);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Set body overflow when mobile menu opens/closes
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = "auto"; // Allow scrolling
    }
  }, [isMobileMenuOpen]);

  // Load currencyData from local storage at the beginning of the component
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const storedCurrencyData = localStorage.getItem("currencyData");
      if (storedCurrencyData) {
        currencyData = JSON.parse(storedCurrencyData);
      }
    }
  }, []);

  return (
    <header className="w-full">
      <section className="w-full text-[14px] text-center sm:text-start bg-black text-white px-5 sm:px-32 py-3">
        {currentDate}
      </section>
      <section className="flex items-center justify-between px-3 sm:px-0 w-full mt-2">
        <nav className="py-0 sm:py-4 font-twenty text-[1.4rem] text-gray-800 sm:mx-auto sm:w-full">
          <div className="flex flex-col items-center justify-center border-0 sm:border-b-2 border-black pb-0">
            <Image
              src={logoImg}
              width={200}
              height={200}
              alt="Logo Image"
              className="self-start m-auto mb-0 sm:mb-2"
            />
            <div className="hidden sm:flex items-center justify-center gap-2 tracking-wide">
              <span className="uppercase font-bold">Tracking Trends</span>
              <span className="h-[20px] w-[1px] bg-black"></span>
              <span className="uppercase font-bold">Informing Decisions</span>
            </div>
            <p className="hidden sm:block md:text-center">
              Business day is a leader in financial and forex business news,
              insight and informed commentary plus all that matters in the
              financial affairs of West Africa
            </p>
            <div className="sm:flex items-center justify-between font-lato text-base h-[60px] w-full mt-2 bg-black text-white fixed bottom-0 left-0 right-0 z-[999] sm:static">
              <div
                className="w-full h-full flex items-center justify-center marquee"
                style={{
                  animation: `marquee ${
                    currencyData.length * 1
                  }s linear infinite`, // Adjust the speed based on the number of currencies
                }}
              >
                {currencyData.map((conversion) => (
                  <span
                    key={conversion.to}
                    className="mx-2 flex items-center justify-center w-auto space-x-6"
                  >
                    <span className="whitespace-nowrap">
                      <span style={{ fontWeight: "bold" }}>
                        NGN/{conversion.to}
                      </span>{" "}
                      <span style={{ fontWeight: "bold", color: "orange" }}>
                        =
                      </span>{" "}
                      <span style={{ fontWeight: "bold", color: "red" }}>
                        {conversion.value.toFixed(2)}
                      </span>
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <ul
            ref={navMenuRef} // Attach the reference to the ul element
            className="hidden sm:flex font-lato font-bold text-[14px] items-center justify-center gap-12 py-5 capitalize border border-b border-gray-200 bg-white fixed top-0 left-0 right-0 z-[999]"
          >
            <Link
              href="/"
              className={
                pathname == "/"
                  ? "active_class"
                  : "hover:text-slate-600 duration-200 transition-all ease-linear"
              }
              passHref
            >
              Rates
            </Link>
            <Link
              href="https://businessday.ng/"
              passHref
              className={
                pathname == "https://businessday.ng/"
                  ? "active_class"
                  : "hover:text-slate-600 duration-200 transition-all ease-linear"
              }
            >
              Business News
            </Link>
            <Link
              href="/analytics"
              className={
                pathname == "/analytics"
                  ? "active_class"
                  : "hover:text-slate-600 duration-200 transition-all ease-linear"
              }
              passHref
            >
              Analytics
            </Link>
            <Link
              href="https://conferences.businessday.ng/"
              passHref
              className={
                pathname == "https://conferences.businessday.ng/"
                  ? "active_class"
                  : "hover:text-slate-600 duration-200 transition-all ease-linear"
              }
            >
              BD Conferences
            </Link>

            <Link
              href="/contact"
              className={
                pathname == "/contact"
                  ? "active_class"
                  : "hover:text-slate-600 duration-200 transition-all ease-linear"
              }
              passHref
            >
              Contact
            </Link>
          </ul>
        </nav>
        <BiMenu
          className="sm:hidden text-4xl -mt-0 cursor-pointer"
          onClick={toggleMobileMenu}
        />
      </section>
      <ul
        id="mobile_nav"
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } absolute z-[999] top-[44.5px] px-10 flex flex-col bg-black border-t-4 border-red-600 text-white w-1/2 h-[100vh] transition-transform duration-200 ease-in-out transform`}
      >
        <Image
          src={logoImg}
          width={200}
          height={200}
          alt="Logo Image"
          className="m-auto mb-0 sm:mb-2 border border-white my-3 mt-8"
        />
        <div className="flex flex-col mt-4 space-y-5">
          <Link className="border-b border-gray-800 pb-4" href="/">
            Rates
          </Link>
          <Link
            className="border-b border-gray-800 pb-4"
            href="https://businessday.ng/"
            target="_blank"
          >
            Business News
          </Link>
          <Link className="border-b border-gray-800 pb-4" href="/analytics">
            Analytics
          </Link>
          <Link
            className="border-b border-gray-800 pb-4"
            href="https://conferences.businessday.ng/"
            target="_blank"
          >
            BD Conferences
          </Link>

          <Link className="border-b border-gray-800 pb-4" href="/contact">
            Contact
          </Link>
        </div>
        <BiX
          className="text-2xl absolute top-2 right-2 cursor-pointer"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      </ul>
    </header>
  );
};

export default Navbar;
