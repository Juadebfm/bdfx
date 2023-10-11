import React, { useState } from "react";
import { BiTransferAlt } from "react-icons/bi";

const CurrencyConverter = () => {
  const [selectedCurrency1, setSelectedCurrency1] = useState("NGN");
  const [selectedCurrency2, setSelectedCurrency2] = useState("AED");
  const [inputValue, setInputValue] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    // Check if the input is a valid number
    if (!/^\d+$/.test(newValue)) {
      setValidationMessage(
        "Please Input a number. Letters & Digits are Invalid"
      );
    } else {
      setValidationMessage("");
    }
  };

  // Define an array for the options of the first select
  const firstSelectOptions = [
    "NGN", // "NGN" as the first option
    "XOF",
    "GHS",
    "CVE",
    "GMD",
    "GNF",
    "GWP",
    "LRD",
    "MRO",
    "SLL",
  ];

  // Define an array for the options of the second select
  const secondSelectOptions = [
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

  // Event handler for clearing the inputs
  const handleClear = () => {
    setInputValue("");
    setSelectedCurrency1("");
    setSelectedCurrency2("");
  };

  // Event handler to handle changes in the select input
  const handleCurrencyChange = (event) => {
    const newValue = event.target.value;
    const selectName = event.target.name;

    if (selectName === "select1") {
      setSelectedCurrency1(newValue);
    } else if (selectName === "select2") {
      setSelectedCurrency2(newValue);
    }
  };

  return (
    <section className="mt-14 sm:mt-32 w-full sm:w-[80%] px-5 sm:px-0 m-auto text-center">
      <h1 className="font-bold text-[42px] font-lato leading-tight">
        Currency Converter
      </h1>
      <p className="font-roboto text-gray-700">
        Instantly Calculate Exchange Rates and Values
      </p>
      <div className="border border-slate-200 rounded-xl shadow-2xl h-max mt-10 px-5 sm:px-14 py-20 pb-12">
        <small className="font-lato text-[14px]">
          Exchange rates can fluctuate frequently and can vary between financial
          institutions. Always verify rates with official sources before making
          any financial decisions
        </small>
        <div className="flex flex-col sm:flex-row items-center justify-between mt-10 relative">
          {validationMessage && (
            <div className="absolute -bottom-10 sm:-bottom-8 font-bold text-[#F91212] text-sm">
              {validationMessage}
            </div>
          )}
          <div className="flex items-center justify-center border border-black w-full sm:w-0 basis-[100%] sm:basis-[45%] h-[92.98px] py-8 sm:py-0 px-4 mb-5 sm:mb-0">
            <div className="flex flex-col items-start justify-center gap-4 w-full">
              <label htmlFor="Amount" className="font-lato text-[14px]">
                Amount
              </label>
              <input
                type="text"
                placeholder="Enter Amount"
                value={inputValue}
                onChange={handleInputChange}
                class="placeholder-font-lato placeholder-text-[14px] border-0 pl-0 focus:outline-none focus:ring-0 focus:border-b focus:border-b-[#F91212] mt-1 w-full sm:w-auto"
              />
            </div>
            <div className="flex flex-col items-end justify-between gap-4 font-lato text-[14px] w-full">
              <label htmlFor="Currency" className="font-lato text-[14px]">
                Currency
              </label>
              <select
                className="bg-white text-[14px] rounded p-2"
                value={selectedCurrency1}
                onChange={handleCurrencyChange}
              >
                {firstSelectOptions.map((currency) => (
                  <option
                    name="select1"
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
          <BiTransferAlt className="basis-[10%] text-3xl mb-5 sm:mb-0" />
          <div className="flex items-center justify-center border border-black w-full sm:w-0 basis-[100%] sm:basis-[45%] h-[92.98px] py-8 sm:py-0 px-4 mb-1 sm:mb-0">
            <div className="flex flex-col items-start justify-center gap-4 w-full">
              <label htmlFor="Amount" className="font-lato text-[14px]">
                Amount
              </label>
              <input
                type="text"
                placeholder="Converted Value"
                disabled="true"
                class="placeholder-font-lato placeholder-text-[14px] border-0 pl-0 focus:outline-none focus:ring-0 focus:border-b focus:border-b-[#F91212] mt-1 w-full sm:w-auto"
              />
            </div>
            <div className="flex flex-col items-end justify-between gap-4 font-lato text-[14px] w-full">
              <label htmlFor="Currency" className="font-lato text-[14px]">
                Currency
              </label>
              <select
                name="select2"
                className="bg-white text-[14px] rounded p-2"
                value={selectedCurrency2}
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
          className="bg-[#F91212] hover:bg-[#F91212]/80 transition-all duration-150 ease-linear text-white w-[300px] h-[50px] text-base rounded-md mt-20 sm:mt-10"
        >
          Clear
        </button>
      </div>
    </section>
  );
};

export default CurrencyConverter;
