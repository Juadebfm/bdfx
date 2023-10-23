"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const LagosParallel = () => {
  const [apiData, setApiData] = useState({});
  const [loading, setLoading] = useState(true);

  // Function to fetch the API data
  const fetchData = async () => {
    try {
      // Retrieve the Bearer token from .env
      const token = process.env.NEXT_PUBLIC_ABOKI_KEY;

      // Make the API request
      const response = await fetch(
        "https://abokifx.com/api/v1/rates/movement",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw Error("Network response was not ok");
      }

      const data = await response.json();
      setApiData(data.response); // Store the response data in state
      setLoading(false); // Set loading to false
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  // Function to format the date to "DD/MM/YYYY HH:MM:SS" format
  const formatDate = (originalDate) => {
    const date = new Date(originalDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getLast5Dates = (data) => {
    const dates = Object.keys(data);
    const sortedDates = dates.sort((a, b) => new Date(b) - new Date(a)); // Sort in descending order
    const uniqueDates = new Set(); // To store unique dates
    const last10UniqueDates = sortedDates
      .filter((date) => {
        if (!uniqueDates.has(date)) {
          uniqueDates.add(date);
          return true;
        }
        return false;
      })
      .slice(0, 10);

    return last10UniqueDates;
  };

  // Function to get all unique currency names from the data
  const getUniqueCurrencyNames = (data) => {
    const currencyNames = [];
    Object.values(data).forEach((items) => {
      items.forEach((item) => {
        if (!currencyNames.includes(item.currency_name)) {
          currencyNames.push(item.currency_name);
        }
      });
    });
    return currencyNames;
  };

  return (
    <section
      className="w-[100%] px-4"
      style={{ height: "400px", overflowY: "auto" }}
    >
      <div className="mb-4">
        <h2 className="font-bold text-[28px] font-lato leading-tight">
          Lagos Parallel Rates (USD, EUR, GBP)
        </h2>
        <small className="text-[#3c9c3c] font-bold">Quotes: *morning **midday ***evening</small>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full mt-3">
          <thead className="table-header-group">
            <tr>
              <th className="flex items-center justify-center gap-5 mt-2 mb-4">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg"
                  width={50}
                  height={50}
                  alt="NGN"
                />
                <span>NGN</span>
              </th>
              {getUniqueCurrencyNames(apiData).map((currencyName) => (
                <th key={currencyName} className="mb-4">
                  <div className="flex items-center justify-center gap-5">
                    {currencyName === "USD" && (
                      <Image
                        src="https://res.cloudinary.com/juadeb/image/upload/v1698037093/BDFX/icons8-usa-48_vjpnbg.png"
                        width={40}
                        height={40}
                        alt={currencyName}
                      />
                    )}
                    {currencyName === "GBP" && (
                      <Image
                        src="https://res.cloudinary.com/juadeb/image/upload/v1698037081/BDFX/icons8-united-kingdom-48_cafoxp.png"
                        width={40}
                        height={40}
                        alt={currencyName}
                      />
                    )}
                    {currencyName === "EUR" && (
                      <Image
                        src="https://res.cloudinary.com/juadeb/image/upload/v1698037069/BDFX/icons8-europe-48_vchvbf.png"
                        width={40}
                        height={40}
                        alt={currencyName}
                      />
                    )}
                    <span>{currencyName}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getLast5Dates(apiData).map((date) => (
              <tr
                key={date}
                className="text-center"
                style={{ border: "1px solid #ccc" }}
              >
                <td>{formatDate(date)}</td>
                {getUniqueCurrencyNames(apiData).map((currencyName) => {
                  const currencyRate = apiData[date].find(
                    (item) => item.currency_name === currencyName
                  );
                  return (
                    <td
                      key={currencyName}
                      className="py-1"
                      style={{ border: "1px solid #ccc" }}
                    >
                      {currencyRate ? currencyRate.currency_rate : "N/A"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default LagosParallel;
