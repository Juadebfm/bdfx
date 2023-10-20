import React, { useEffect, useState } from "react";

const AbokifxData = () => {
  const [data, setData] = useState(null);
  const token = "92d2eaf8d52d65afd451f17ecd8816c0a6605f3a"; // Your authorization token

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://abokifx.com/api/v1/rates/movement",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          // Update the state with the fetched data
          setData(result);
        } else {
          // Handle error cases here
          console.error("Failed to fetch data from Abokifx API");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [token]);

  return (
    <div>
      {/* Display the fetched data here */}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default AbokifxData;
