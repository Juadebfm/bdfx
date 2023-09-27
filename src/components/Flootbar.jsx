import React from "react";

const Flootbar = ({ data }) => {
  // Check if data exists before displaying it
  if (!data) {
    return <div>Loading data...</div>;
  }

  // Extract data from the API response
  const { base, rates } = data;

  // Define the exchange rate of USD to NGN
  const usdToNgnRate = 780;

  return (
    <div className="flex items-center justify-between">
      {Object.entries(rates).map(([currency, rate]) => {
        // Calculate the value of the pairing currency in terms of NGN
        const valueInNGN = usdToNgnRate / rate;

        return (
          <div key={currency} className="border border-r-0 border-black font-robotoFont text-[13px] font-bold">
            <div className="w-[220px] p-4 flex items-center justify-between">
              <div>NGN/{currency}</div>
              <div>{valueInNGN.toFixed(2)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Flootbar;
