"use client"
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
        throw new Error("Network response was not ok");
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

  // Function to format the date to "DD/MM/YYYY" format
  const formatDate = (originalDate) => {
    const date = new Date(originalDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Function to get the last 5 dates from the data
  const getLast5Dates = (data) => {
    const dates = Object.keys(data);
    const last5Dates = dates.slice(-5); // Get the last 5 dates
    return last5Dates;
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
      className="w-[80%] m-auto"
      style={{ height: "400px", overflowY: "auto" }}
    >
      <h1>Lagos Parallel Market Rates (Last 5 Days)</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th className="flex items-center justify-center gap-5">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg"
                  width={50}
                  height={50}
                  alt="NGN"
                />
                <span>NGN</span>
              </th>
              {getUniqueCurrencyNames(apiData).map((currencyName) => (
                <th key={currencyName}>{currencyName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getLast5Dates(apiData).map((date) => (
              <tr key={date}>
                <td>{formatDate(date)}</td>
                {getUniqueCurrencyNames(apiData).map((currencyName) => {
                  const currencyRate = apiData[date].find(
                    (item) => item.currency_name === currencyName
                  );
                  return (
                    <td key={currencyName}>
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
