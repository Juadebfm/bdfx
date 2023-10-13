import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

function LineChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Calculate start_date (6 months ago) and end_date (current date)
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 4);

    const start_date = sixMonthsAgo.toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'
    const end_date = today.toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'

    const from = "NGN";
    const to = "USD,EUR,AED,AUD,CAD,CNY,GBP,GHS,XAF,XOF,ZAR";

    // Set up API headers
    const headers = {
      "X-RapidAPI-Key": "212eb6b3ddmsh09b08aa0756630cp1bad60jsnb17f34b14dea",
      "X-RapidAPI-Host":
        "currency-conversion-and-exchange-rates.p.rapidapi.com",
    };

    // Construct the URL
    const url = `https://currency-conversion-and-exchange-rates.p.rapidapi.com/timeseries?start_date=${start_date}&end_date=${end_date}&from=${from}&to=${to}`;

    // Make the API request
    fetch(url, { method: "GET", headers })
      .then((response) => response.json())
      .then((data) => {
        // Log the API response data
        console.log(data);

        // Transform the data for the chart
        const labels = Object.keys(data.rates);
        labels.sort((a, b) => new Date(a) - new Date(b)); // Sort labels in ascending order

        const selectedCurrency = "USD"; // Example: You can change this to any currency from 'to'
        const ngntoSelectedCurrency = labels.map(
          (date) => data.rates[date][selectedCurrency]
        );

        // Format the date labels to "DD Mon" format
        const formattedLabels = labels.map((date) => {
          const options = { day: "2-digit", month: "short" };
          return new Date(date).toLocaleDateString("en-US", options);
        });

        // Create the chart data
        const transformedData = {
          labels: formattedLabels, // Use the formatted date labels
          datasets: [
            {
              label: `NGN to ${selectedCurrency}`,
              data: ngntoSelectedCurrency,
              borderColor: getRandomColor(),
              borderWidth: 3,
            },
          ],
        };

        setChartData(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Function to generate random colors
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const options = {
    plugins: {
      legend: true,
    },
    responsive: true,
    scales: {
      y: {
        ticks: {
          font: {
            size: 14,
            weight: "300",
          },
          stepSize: 0.02, // Increase the step size to adjust the scale intervals
          beginAtZero: false, // Set this to false to start the scale from the minimum data value
          max: 1.14, // Set the maximum value to 1.14 to provide some space at the top
        },
        title: {
          display: true,
          text: "Exchange Rate",
          padding: {
            bottom: 10,
          },
          font: {
            size: 14,
            style: "italic",
            family: "Sans-serif",
          },
        },
        min: 1.04, // Set the minimum value to 1.04
      },
      x: {
        ticks: {
          font: {
            size: 14,
            weight: "300",
          },
        },
        title: {
          display: true,
          text: "Date",
          padding: {
            top: 10,
          },
          font: {
            size: 14,
            style: "italic",
            family: "sans-serif",
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.05, // Adjust the tension to your preference
        borderWidth: 0.1, // Increase line width
      },
      point: {
        radius: 0.05, // Increase point size
        borderWidth: 0.1, // Increase point border width
      },
    },
  };

  return (
    <div>
      <h1 className="font-bold text-3xl text-center">
        Exchange Rate Line Chart
      </h1>
      <div
        style={{
          padding: "20px",
          cursor: "pointer",
        }}
        className="h-max w-[100%]"
      >
        {chartData && (
          <Line className="w-[100%]" data={chartData} options={options} />
        )}
      </div>
    </div>
  );
}

export default LineChart;
