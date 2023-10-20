import React, { useEffect, useState } from "react";

const AbokifxRates = () => {
  const [ratesData, setRatesData] = useState(null);
  const token = process.env.NEXT_PUBLIC_ABOKI_KEY; // Your authorization token

  useEffect(() => {
    // Define the API URL
    const apiUrl = "https://abokifx.com/api/v1/rates/lagos_previous";

    // Set up API headers with the authorization token
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Make the API request
    fetch(apiUrl, { method: "GET", headers })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response data
        setRatesData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Function to render the table
  const renderTable = () => {
    if (ratesData && ratesData.rates) {
      const rates = ratesData.rates;

      const tableRows = Object.keys(rates).map((currency) => (
        <tr key={currency}>
          <td>{currency}</td>
          <td>{rates[currency]}</td>
        </tr>
      ));

      return (
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      );
    } else {
      return <p>Loading...</p>;
    }
  };

  // You can render the fetched data in a table
  return (
    <div>
      <h2>Abokifx Lagos Previous Rates</h2>
      {renderTable()}
    </div>
  );
};

export default AbokifxRates;
