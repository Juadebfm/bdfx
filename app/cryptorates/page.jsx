"use client";
import React, { useState, useEffect } from "react";

const CryptoRates = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the CoinGecko API
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
      .then((response) => response.json())
      .then((data) => {
        setCryptoData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function calculateTotalMarketCap() {
    const totalMarketCap = cryptoData.reduce((total, crypto) => {
      return total + parseFloat(crypto.market_cap);
    }, 0);
    return totalMarketCap.toFixed(2);
  }

  function calculateTotalVolume24h() {
    const totalVolume24h = cryptoData.reduce((total, crypto) => {
      return total + parseFloat(crypto.total_volume);
    }, 0);
    return totalVolume24h.toFixed(2);
  }

  function calculateBtcDominance() {
    const totalMarketCap = calculateTotalMarketCap();
    const btcMarketCap = cryptoData.find(
      (crypto) => crypto.id === "bitcoin"
    )?.market_cap;

    if (totalMarketCap && btcMarketCap) {
      const btcDominance = (btcMarketCap / totalMarketCap) * 100;
      return btcDominance.toFixed(2); // To round to 2 decimal places
    }
    return 0; // Return 0 if data is not available
  }

  return (
    <section className="px-0 sm:px-14 m-auto mt-5 sm:mt-14 sm:mb-10 h-auto w-[90%] sm:w-[100%] font-lato text-base">
      <h1 className="font-bold text-[24px] sm:text-[30px] font-lato leading-tight">
        Cryptocurrency Prices by Market Cap
      </h1>
      <p className="font-roboto text-gray-700 text-base sm:text-[17px] mt-2">
        The global cryptocurrency market cap today is $
        {formatNumberWithCommas(Math.floor(calculateTotalMarketCap()))} Trillion
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-4 place-content-center gap-4 mt-6">
        <div className="border-[2px] rounded-md border-slate-300 py-5 px-5">
          <p className="tracking-wide text-slate-800 text-xl font-bold">
            ${formatNumberWithCommas(calculateTotalMarketCap())}
          </p>
          <h3 className="font-roboto text-gray-700 text-base sm:text-[17px] mt-2">
            Market Capitalization
          </h3>
        </div>
        <div className="border-[2px] rounded-md border-slate-300 py-5 px-5">
          <p className="tracking-wide text-slate-800 text-xl font-bold">
            ${formatNumberWithCommas(calculateTotalVolume24h())}
          </p>
          <h3 className="font-roboto text-gray-700 text-base sm:text-[17px] mt-2">
            24H Trading Volume
          </h3>
        </div>

        <div className="border-[2px] rounded-md border-slate-300 py-5 px-5">
          <p className="tracking-wide text-slate-800 text-xl font-bold">
            {calculateBtcDominance()}%
          </p>
          <h3 className="font-roboto text-gray-700 text-base sm:text-[17px] mt-2">
            Bitcoin Market Cap Dominance
          </h3>
        </div>
        <div className="border-[2px] rounded-md border-slate-300 py-5 px-5">
          <p className="tracking-wide text-slate-800 text-xl font-bold">
            {cryptoData.length > 0 && cryptoData[0].name}
          </p>
          <h3 className="font-roboto text-gray-700 text-base sm:text-[17px] mt-2">
            Top Ranking Coin
          </h3>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-container overflow-x-scroll sm:overflow-x-hidden">
          <table className="table-auto w-full mt-14 border-[1px] border-slate-300">
            <thead>
              <tr className="border-[1px] border-slate-300">
                <th className="text-center py-4">Rank</th>
                <th className="text-center py-4">Name</th>
                <th className="text-center py-4">Price (USD)</th>
                <th className="text-center py-4">Market Cap (USD)</th>
                <th className="text-center py-4">24Hr Volume (USD)</th>
                <th>More Information</th>
              </tr>
            </thead>
            <tbody>
              {cryptoData.map((crypto) => (
                <tr key={crypto.id} className="border-[1px] border-slate-300">
                  <td className="py-4 px-2 text-center border-[1px] border-slate-300">
                    {crypto.market_cap_rank}
                  </td>
                  <td className="py-4 px-2 pl-1 sm:pl-8 flex items-center justify-start gap-2 w-max">
                    <img
                      src={crypto.image}
                      alt={crypto.name}
                      className="h-8 w-8"
                    />

                    {crypto.name}
                  </td>
                  <td className="py-4 px-2 text-center border-[1px] border-slate-300 w-max font-bold">
                    $
                    {formatNumberWithCommas(
                      parseFloat(crypto.current_price).toFixed(1)
                    )}
                  </td>
                  <td className="py-4 px-2 text-center border-[1px] border-slate-300 w-max">
                    ${formatNumberWithCommas(parseFloat(crypto.market_cap))}
                  </td>
                  <td className="py-4 px-2 text-center border-[1px] border-slate-300 w-max">
                    ${formatNumberWithCommas(parseFloat(crypto.total_volume))}
                  </td>
                  <td className="border-[1px] border-slate-300 text-center">
                    <a
                      href={`https://www.coingecko.com/en/coins/${crypto.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-500"
                    >
                      Learn More
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default CryptoRates;
