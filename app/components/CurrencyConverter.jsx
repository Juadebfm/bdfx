"use client";

import React, { useEffect, useState } from "react";
import { BiTransferAlt } from "react-icons/bi";
import { FaExclamation } from "react-icons/fa6";
import debounce from "lodash/debounce";

const CurrencyConverter = () => {
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [haveCurrency, setHaveCurrency] = useState("NGN");
  const [wantCurrency, setWantCurrency] = useState("AED");

  const [apiData, setApiData] = useState(null);
  const [selectedCurrencyRate, setSelectedCurrencyRate] = useState("");

  const calculateExchangeRate = () => {
    if (apiData && wantCurrency) {
      const dates = Object.keys(apiData.response);
      const mostRecentDate = dates[0];
      const currencyRate = apiData.response[mostRecentDate].find(
        (item) => item.currency_name === wantCurrency
      );

      if (currencyRate) {
        // Split the exchange rate string by '/' and get the last part
        const parts = currencyRate.currency_rate.split("/");
        const lastPart = parts[1].trim();

        // Remove any '*' character if it exists
        const cleanRate = lastPart.replace("*", "");

        // Format the exchange rate
        const formattedRate = `1.00 ${wantCurrency} = ${cleanRate} NGN`;

        setSelectedCurrencyRate(formattedRate);
      }
    }
  };

  // Call the function to calculate the exchange rate whenever 'wantCurrency' or 'apiData' changes
  useEffect(() => {
    calculateExchangeRate();
  }, [wantCurrency, apiData]);

  const fetchExchangeRate = async () => {
    try {
      let apiUrl;

      // Determine the API URL based on selected wantCurrency
      if (["USD", "GBP", "EUR"].includes(wantCurrency)) {
        apiUrl = "https://abokifx.com/api/v1/rates/movement";
      } else {
        apiUrl = "https://abokifx.com/api/v1/rates/otherparallel";
      }

      // Define the request headers
      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ABOKI_KEY}`, // Replace with your actual token
      };

      // Make the API request
      const response = await fetch(apiUrl, { headers });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setApiData(data); // Store the response data in state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (wantCurrency) {
      fetchExchangeRate();
    }
  }, [wantCurrency]);

  useEffect(() => {
    if (apiData) {
      console.log("API Data:", apiData);
      // You can process or use the data as needed here
    }
  }, [apiData]);

  const secondSelectOptions = [
    "USD",
    "GBP",
    "EUR",
    "CAD",
    "ZAR",
    "AED",
    "CNY",
    "AUD",
    "GHS",
    "XAF",
    "XOF",
  ];

  const handleInputChange1 = (event) => {
    const newValue = event.target.value;
    setInputValue1(newValue);
    setInputValue2("");
    setHaveCurrency("NGN");
    setValidationMessage("");

    if (!/^\d+$/.test(newValue)) {
      setValidationMessage(
        "Please Input a number. Letters & Symbols are Invalid"
      );
    } else {
      setValidationMessage("");
    }
  };

  const handleInputChange2 = (event) => {
    const newValue = event.target.value;
    setInputValue2(newValue);
    setInputValue1("");
    setHaveCurrency(wantCurrency);
    setValidationMessage("");

    if (!/^\d+$/.test(newValue)) {
      setValidationMessage(
        "Please Input a number. Letters & Symbols are Invalid"
      );
    } else {
      setValidationMessage("");
    }
  };

  const handleClear = () => {
    setInputValue1("");
    setInputValue2("");
    setHaveCurrency("NGN");
    setWantCurrency(secondSelectOptions[0]);
  };

  const handleCurrencyChange = (event) => {
    const newValue = event.target.value;
    setWantCurrency(newValue);
  };

  return (
    <section className="mt-14 sm:mt-12 w-full sm:w-[80%] md:w-[100%] lg:w-[80%] px-5 sm:px-0 m-auto text-center">
      <h1 className="font-bold text-[26px] sm:text-[30px] font-lato leading-tight">
        Currency Converter
      </h1>
      <p className="font-roboto text-gray-700 text-base sm:text-[17px]">
        Instantly Calculate Exchange Rates and Values
      </p>
      <div className="border border-slate-200 rounded-xl shadow-2xl h-max mt-10 px-5 sm:px-14 md:px-5 lg:px-14 py-20 pb-12">
        <small className="font-lato text-[14px]">
          Exchange rates can fluctuate frequently and can vary between financial
          institutions. Always verify rates with official sources before making
          any financial decisions
        </small>
        <div className="flex flex-col sm:flex-row items-center justify-between mt-10 relative">
          {validationMessage && (
            <div className="absolute flex gap-2 items-center -bottom-10 sm:-bottom-8 font-bold text-[#F91212] text-sm">
              <FaExclamation className="border border-[#F91212] font-bold rounded-full" />
              {validationMessage}
            </div>
          )}
          <span className="absolute flex gap-2 items-center -bottom-10 right-0 sm:-bottom-8 font-bold text-sm">
            {selectedCurrencyRate}
          </span>
          <div className="flex items-center justify-center border border-black w-full sm:w-0 basis-[100%] sm:basis-[45%] h-[92.98px] py-8 sm:py-0 px-4 mb-5 sm:mb-0">
            <div className="flex flex-col items-start justify-center gap-4 w-full">
              <label htmlFor="Amount" className="font-lato text-[14px]">
                Amount
              </label>
              <input
                id="AmountToConvert"
                type="text"
                placeholder="Amount"
                value={inputValue1}
                onChange={handleInputChange1}
                className="placeholder:font-lato placeholder:text-[14px] font-bold border-0 pl-2 focus:outline-none focus:ring-0 focus:border-b focus:border-b-[#F91212] mt-1 w-full sm:w-auto"
              />
            </div>
            <div className="flex flex-col items-end justify-between gap-4 font-lato text-[14px] w-full">
              <label htmlFor="Currency" className="font-lato text-[14px]">
                Currency
              </label>
              <select
                id="firstSelect"
                value={haveCurrency}
                className="bg-white text-[14px] rounded p-2"
                disabled
                onChange={handleCurrencyChange}
              >
                <option value="NGN" className="font-lato text-[14px]">
                  NGN
                </option>
              </select>
            </div>
          </div>
          <BiTransferAlt className="basis-[10%] text-3xl mb-5 sm:mb-0" />
          <div className="flex items-center justify-center border border-black w-full sm:w-0 basis-[100%] sm:basis-[45%] h-[92.98px] py-8 sm:py-0 px-4 mb-1 sm:mb-0">
            <div className="flex flex-col items-start justify-center gap-4 w-full">
              <label htmlFor="Amount" className="font-lato text-[14px]">
                Amount
              </label>
              <input
                type="text"
                placeholder={
                  inputValue1 ? `Converting to ${wantCurrency}` : "Amount"
                }
                onChange={handleInputChange2}
                className="placeholder:font-lato placeholder:text-[14px] font-bold border-0 pl-0 focus:outline-none focus:ring-0 focus:border-b focus:border-b-[#F91212] mt-1 w-full sm:w-auto"
                value={inputValue2}
              />
            </div>
            <div className="flex flex-col items-end justify-between gap-4 font-lato text-[14px] w-full">
              <label htmlFor="Currency" className="font-lato text-[14px]">
                Currency
              </label>
              <select
                id="secondSelect"
                value={wantCurrency}
                className="bg-white text-[14px] rounded p-2"
                onChange={handleCurrencyChange}
              >
                {secondSelectOptions.map((currency) => (
                  <option
                    key={currency}
                    value={currency}
                    className="font-lato text-[14px]"
                  >
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <button
          onClick={handleClear}
          className="bg-[#F91212] hover-bg-[#F91212]/80 transition-all duration-150 ease-linear text-white w-[300px] h-[50px] text-base rounded-md mt-20"
        >
          Clear
        </button>
      </div>
    </section>
  );
};

export default CurrencyConverter;
