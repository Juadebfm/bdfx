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
  const [haveCurrency2, setHaveCurrency2] = useState("NGN"); // Step 1
  const [wantCurrency, setWantCurrency] = useState("AED");

  const [apiData, setApiData] = useState(null);
  const [selectedCurrencyRate, setSelectedCurrencyRate] = useState("");

  const [exchangeRate, setExchangeRate] = useState(null);

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

        // Set the exchange rate in state
        setExchangeRate(parseFloat(cleanRate));

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
      let response;

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
      response = await fetch(apiUrl, { headers });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setApiData(data); // Store the response data in state

      // If the data for the selected currency is not available for the current date,
      // iterate through historical data to find the most recent date with the data.
      if (data && wantCurrency) {
        const dates = Object.keys(data.response);
        let currencyData = data.response[dates[0]].find(
          (item) => item.currency_name === wantCurrency
        );

        // If currency data is not found for the current date, look for it in previous dates.
        if (!currencyData) {
          for (let i = 1; i < dates.length; i++) {
            currencyData = data.response[dates[i]].find(
              (item) => item.currency_name === wantCurrency
            );
            if (currencyData) {
              break;
            }
          }
        }

        // Update exchange rate data with the found currency rate.
        if (currencyData) {
          const parts = currencyData.currency_rate.split("/");
          const lastPart = parts[1].trim();
          const cleanRate = lastPart.replace("*", "");
          setExchangeRate(parseFloat(cleanRate));

          const formattedRate = `1.00 ${wantCurrency} = ${cleanRate} NGN`;
          setSelectedCurrencyRate(formattedRate);
        }
      }
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

  // Add this useEffect to recalculate the converted value when 'wantCurrency' changes
  useEffect(() => {
    if (exchangeRate && inputValue1) {
      const convertedValue = calculateConvertedValue(inputValue1, exchangeRate);
      setInputValue2(convertedValue);
    }
  }, [wantCurrency, exchangeRate]);

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
    setValidationMessage("");

    if (!/^\d*\.?\d*$/.test(newValue)) {
      setValidationMessage("Please Input a valid number.");
    } else {
      setValidationMessage("");
      debouncedInputChange(newValue, true); // Pass 'true' to indicate NGN to other currency conversion
    }
  };

  const handleInputChange2 = (event) => {
    const newValue = event.target.value;
    setInputValue2(newValue);
    setValidationMessage("");

    if (!/^\d*\.?\d*$/.test(newValue)) {
      setValidationMessage("Please Input a valid number.");
    } else {
      setValidationMessage("");
      debouncedInputChange(newValue, false); // Pass 'false' to indicate other currency to NGN conversion
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

  // Updated calculateConvertedValue function to handle both conversions
  const calculateConvertedValue = (amount, exchangeRate, isToNGN) => {
    if (!isNaN(amount) && !isNaN(exchangeRate)) {
      if (isToNGN) {
        return (amount / exchangeRate).toFixed(2); // Convert to NGN
      } else {
        return (amount * exchangeRate).toFixed(2); // Convert from NGN
      }
    }
    return "";
  };

  // Debounce input changes and perform conversion after 1000ms
  const debouncedInputChange = debounce((amount, isToNGN) => {
    const convertedValue = calculateConvertedValue(
      amount,
      exchangeRate,
      isToNGN
    );
    if (isToNGN) {
      setInputValue2(convertedValue);
    } else {
      setInputValue1(convertedValue);
    }
  }, 1000);

  useEffect(() => {
    if (exchangeRate && inputValue1) {
      const convertedValue = calculateConvertedValue(
        inputValue1,
        exchangeRate,
        false
      );
      setInputValue2(convertedValue);
    }
  }, [wantCurrency, exchangeRate]);

  useEffect(() => {
    if (exchangeRate && inputValue2) {
      const convertedValue = calculateConvertedValue(
        inputValue2,
        exchangeRate,
        true
      );
      setInputValue1(convertedValue);
    }
  }, [haveCurrency2, exchangeRate]);

  return (
    <section className="mt-14 sm:mt-12 w-full px-1 sm:px-3 m-auto text-center">
      <h1 className="font-bold text-[26px] sm:text-[30px] font-lato leading-tight">
        Currency Converter
      </h1>
      <p className="font-roboto text-gray-700 text-base sm:text-[17px]">
        Instantly Calculate Exchange Rates and Values
      </p>
      <div className="border border-slate-200 rounded-xl shadow-2xl h-max mt-10 px-5 sm:px-14 md:px-10 lg:px-14 py-20 pb-12">
        <small className="font-lato text-[14px]">
          Exchange rates can fluctuate frequently and can vary between financial
          institutions. Always verify rates with official sources before making
          any financial decisions
        </small>
        <div className="flex flex-col sm:flex-row items-center justify-between mt-10 py-1 relative">
          {validationMessage && (
            <div className="absolute flex gap-2 items-start sm:items-center -bottom-12 sm:-bottom-8 font-bold text-[#F91212] text-sm">
              <FaExclamation className="border border-[#F91212] font-bold rounded-full mt-[0.20rem]" />
              {validationMessage}
            </div>
          )}
          <span className="absolute flex gap-2 items-center -bottom-20 sm:-bottom-8 sm:right-0 font-bold text-sm">
            {selectedCurrencyRate}
          </span>
          <div className="flex items-center justify-center border border-black w-full sm:w-0 basis-[100%] sm:basis-[45%] h-[120px] py-8 sm:py-0 px-4 mb-5 sm:mb-0">
            <div className="flex flex-col items-start justify-center gap-4 w-full">
              <label
                htmlFor="Amount"
                className="font-lato font-bold text-[14px]"
              >
                Amount In Naira
              </label>
              <input
                id="AmountToConvert"
                type="text"
                placeholder="Amount"
                value={inputValue1}
                onChange={handleInputChange1}
                className="placeholder:font-lato placeholder:text-[12px] sm:placeholder:text-[14px] font-bold border-0 pl-2 focus:outline-none focus:ring-0 focus:border-b focus:border-b-[#F91212] mt-1 w-[100%] sm:w-auto"
              />
            </div>
            <div className="flex flex-col items-end justify-between gap-4 font-lato text-[14px] w-auto">
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
          <div className="flex items-center justify-center border border-black w-full sm:w-0 basis-[100%] sm:basis-[45%] h-[120px] py-8 sm:py-0 px-4 mb-1 sm:mb-0">
            <div className="flex flex-col items-start justify-center gap-4 w-full">
              <label
                htmlFor="Amount"
                className="font-lato font-bold text-[14px]"
              >
                {`Amount in ${wantCurrency}`}
              </label>
              <input
                type="text"
                placeholder={
                  inputValue1
                    ? `Converting to ${wantCurrency}`
                    : "Converted Value From NGN"
                }
                // disabled
                onChange={handleInputChange2}
                className="placeholder:font-lato placeholder:text-[12px] sm:placeholder:text-[14px] font-bold border-0 pl-0 focus:outline-none focus:ring-0 focus:border-b focus:border-b-[#F91212] mt-1 w-full sm:w-auto"
                value={inputValue2}
              />
            </div>
            <div className="flex flex-col items-end justify-between gap-4 font-lato text-[14px] w-auto">
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
          className="bg-[#F91212] hover-bg-[#F91212]/80 transition-all duration-150 ease-linear text-white w-[250px] sm:w-[300px] h-[50px] text-base rounded-md mt-24"
        >
          Clear
        </button>
      </div>
    </section>
  );
};

export default CurrencyConverter;
