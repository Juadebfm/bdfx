import React, { useState, useEffect } from "react";

const Timeseries = () => {
  const [timeseriesData, setTimeseriesData] = useState(null);

  const apiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;


  // Define the API endpoint URL
  const apiUrl = `https://api.currencybeacon.com/v1/timeseries?base=USD&start_date=2023-06-27&end_date=2023-09-27&symbols=EUR,GBP,JPY&api_key=${apiKey}`;

  useEffect(() => {
    const fetchTimeseriesData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          // Log the data to the console
          console.log("Timeseries Data:", data);
          setTimeseriesData(data);
        } else {
          console.error("Error fetching timeseries data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching timeseries data:", error);
      }
    };

    fetchTimeseriesData();
  }, [apiUrl]);

  return (
    <div>
      <h2>Timeseries Data</h2>
      {timeseriesData ? (
        <pre>{JSON.stringify(timeseriesData, null, 2)}</pre>
      ) : (
        <div>Loading timeseries data...</div>
      )}
    </div>
  );
};

export default Timeseries;
