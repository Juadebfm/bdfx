"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import format from "date-fns/format";
import Link from "next/link";
import { BiMenu, BiX } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const logoImg =
  "https://res.cloudinary.com/juadeb/image/upload/v1696431204/BDFX/bdfx_fx_tts8nv.png";

function fetchData(apiKey) {
  const apiUrl = `https://api.currencybeacon.com/v1/latest?api_key=${apiKey}`;

  return fetch(apiUrl).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

// New API configuration
const conversionUrl =
  "https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency";
const conversionOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "212eb6b3ddmsh09b08aa0756630cp1bad60jsnb17f34b14dea",
    "X-RapidAPI-Host": "currency-converter-by-api-ninjas.p.rapidapi.com",
  },
};

const currenciesToCompare = [
  "AED",
  "AUD",
  "CAD",
  "CNY",
  "EUR",
  "GBP",
  "GHS",
  "USD",
  "XAF",
  "XOF",
  "ZAR",
];
const baseCurrency = "NGN"; // Set NGN as the base currency

const Navbar = () => {
  const pathname = usePathname();
  const [currentDate, setCurrentDate] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [data, setData] = useState(null); // Initialize data state as null
  const [convertedRates, setConvertedRates] = useState([]);
  const [formattedRates, setFormattedRates] = useState([]);

  // Define your API key here
  const apiKey = "BntwBy7KMtxjffTe21o6I2ESYMNZBcGP"; // Replace with your actual API key

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData(apiKey)
      .then((result) => {
        setData(result);
        // Call function to convert rates when data is fetched
        convertRates(result.rates);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [apiKey]); // Include apiKey in the dependency array

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

  const formatConversionData = (data) => {
    return (
      <div>
        <div>
          {data.old_currency}/{data.new_currency} = {data.new_amount}
        </div>
      </div>
    );
  };

  const convertRates = async () => {
    try {
      const lastFetchTime = localStorage.getItem("lastFetchTime");
      const currentTime = new Date().getTime();

      if (
        !lastFetchTime ||
        currentTime - parseInt(lastFetchTime, 10) >= 24 * 60 * 60 * 1000
      ) {
        const formattedRatesData = await Promise.all(
          currenciesToCompare.map(async (currency) => {
            const url = `${conversionUrl}?have=${currency}&want=${baseCurrency}&amount=1`;
            const response = await fetch(url, conversionOptions);
            const result = await response.json();
            return formatConversionData(result);
          })
        );

        // Set the state with the formatted conversion rates
        setFormattedRates(formattedRatesData);

        // Save the converted rates in local storage
        localStorage.setItem(
          "convertedRates",
          JSON.stringify(formattedRatesData)
        );
        localStorage.setItem("lastFetchTime", currentTime.toString());
      }
    } catch (error) {
      console.error("Error converting rates:", error);
    }
  };

  // Check if an API call is needed when the component mounts
  useEffect(() => {
    convertRates(); // Always try to fetch rates when the component mounts
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
            <p className="hidden sm:block">
              Business day is a leader in financial and forex business news,
              insight and informed commentary plus all that matters in the
              financial affairs of West Africa
            </p>
            <div className="hidden sm:flex items-center justify-between font-lato text-base h-[40px] w-full mt-2 bg-black text-white">
              <motion.div
                className="w-full h-full flex items-center justify-center"
                initial={{ x: "100%" }} // Start from the right edge of the container
                animate={{ x: "-100%" }} // Move to the left edge of the container
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  repeatType: "loop",
                }} // Set animation duration and loop
              >
                {convertedRates &&
                  convertedRates.map((rate, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center gap-10"
                    >
                      <div className="mr-8">
                        {rate.old_currency}/{rate.new_currency} ={" "}
                        {rate.new_amount}
                      </div>
                    </div>
                  ))}
              </motion.div>
            </div>
          </div>
          <ul className="hidden sm:flex font-lato text-base items-center justify-center gap-12 py-4 uppercase border border-b border-gray-200">
            <Link
              href="/"
              className={pathname == "/" ? "active_class" : ""}
              passHref
            >
              Rates
            </Link>
            <Link
              href="/businessnews"
              className={pathname == "/businessnews" ? "active_class" : ""}
              passHref
            >
              Business News
            </Link>
            <Link
              href="/analytics"
              className={pathname == "/analytics" ? "active_class" : ""}
              passHref
            >
              Analytics
            </Link>
            <Link
              href="/cryptorates"
              className={pathname == "/cryptorates" ? "active_class" : ""}
              passHref
            >
              BD Conferences
            </Link>

            <Link
              href="/contact"
              className={pathname == "/contact" ? "active_class" : ""}
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
        } absolute top-[44.5px] px-10 flex flex-col bg-black border-t-4 border-red-600 text-white w-1/2 h-[100vh] transition-transform duration-300 ease-in-out transform`}
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
          <Link className="border-b border-gray-800 pb-4" href="/businessnews">
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
