import React, { useState } from "react";
import { BiTransferAlt } from "react-icons/bi";

const CurrencyConverter = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(""); // State to track the selected currency

  // Array of currency options with "AED" as the first option
  const currencyOptions = [
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

  // Event handler to handle changes in the select input
  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value); // Update the selected currency state
  };

  return (
    <section className="mt-14 sm:mt-32 w-full sm:w-[80%] px-5 sm:px-0 m-auto text-center">
      <h1 className="font-bold text-[42px] font-lato">Currency Converter</h1>
      <p className="font-roboto text-gray-700">
        Instantly Calculate Exchange Rates and Values
      </p>
      <div className="border border-slate-100 rounded-xl shadow-2xl h-max mt-10 px-5 sm:px-14 py-20 pb-5">
        <small className="font-lato text-[14px]">
          Exchange rates can fluctuate frequently and can vary between financial
          institutions. Always verify rates with official sources before making
          any financial decisions
        </small>
        <div className="flex flex-col sm:flex-row items-center justify-between mt-10">
          <div className="flex items-center justify-center border border-black w-full sm:w-0 basis-[100%] sm:basis-[45%] h-[92.98px]">
            <div className="flex flex-col items-start justify-center">
              <label htmlFor="Amount" className="font-lato text-[14px]">
                Amount
              </label>
              <input
                type="text"
                placeholder="Enter NGN Amount"
                className="placeholder:font-lato placeholder:text-[14px] focus:outline-none focus:border-b focus:border-black mt-1 w-full sm:w-auto"
              />
            </div>
            <div className="font-lato text-[14px]">NGN</div>
          </div>
          <BiTransferAlt className="basis-[10%] text-3xl" />
          <div className="flex items-center justify-center border border-black w-full sm:w-0 basis-[100%] sm:basis-[45%] h-[92.98px]">
            <div className="flex flex-col items-start justify-center">
              <label htmlFor="Amount" className="font-lato text-[14px]">
                Converted To
              </label>
              <input
                type="text"
                placeholder="----------"
                className="placeholder:font-lato placeholder:text-[14px] focus:outline-none focus:border-b focus:border-black mt-1"
              />
            </div>
            <select
              className="bg-white text-[14px] rounded p-2"
              value={selectedCurrency}
              onChange={handleCurrencyChange}
            >
              {currencyOptions.map((currency) => (
                <option
                  key={currency}
                  value={currency}
                  className="font-lato text-[14px]"
                >
                  {currency}
                </option>
              ))}
            </select>
            {selectedCurrency && <p>Selected Currency: {selectedCurrency}</p>}
          </div>
        </div>
        <button className="bg-[#F91212] hover:bg-[#F91212]/80 transition-all duration-150 ease-linear text-white w-[300px] h-[50px] text-base rounded-md mt-10">
          Convert
        </button>
      </div>
    </section>
  );
};

export default CurrencyConverter;
