"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const MarketNews = () => {
  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const lastAPICallTimestampForFeeds = localStorage.getItem(
        "lastAPICallTimestampForFeeds"
      );
      const currentTime = new Date().getTime();
      const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      // Check if the last API call is older than 24 hours or doesn't exist
      if (
        !lastAPICallTimestampForFeeds ||
        currentTime - lastAPICallTimestampForFeeds > twentyFourHours
      ) {
        // Proceed with the API call
        const fetchFeedData = async () => {
          const url =
            "https://feed-reader3.p.rapidapi.com/load?url=https%3A%2F%2Fbusinessday.ng%2Fcategory%2Fmarkets%2Ffeed%2F";
          const options = {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "212eb6b3ddmsh09b08aa0756630cp1bad60jsnb17f34b14dea",
              "X-RapidAPI-Host": "feed-reader3.p.rapidapi.com",
            },
          };

          try {
            const response = await fetch(url, options);
            if (response.ok) {
              const result = await response.json();
              console.log(result);
              setFeedData(result.data);
              setLoading(false);

              // Update the last API call timestamp in local storage
              localStorage.setItem("lastAPICallTimestampForFeeds", currentTime);

              // Cache the API response data in local storage
              localStorage.setItem(
                "cachedFeedData",
                JSON.stringify(result.data)
              );
            } else {
              throw new Error("Network response was not ok");
            }
          } catch (error) {
            console.error(error);
            setLoading(false);
          }
        };

        fetchFeedData();
      } else {
        // Use the cached data from local storage if the API call isn't needed
        const cachedData = localStorage.getItem("cachedFeedData");
        if (cachedData) {
          setFeedData(JSON.parse(cachedData));
          setLoading(false);
        }
      }
    }
  }, []);

  // Function to format the time ago
  const formatTimeAgo = (publishDate) => {
    const currentDate = new Date();
    const itemDate = new Date(publishDate);
    const timeDifference = currentDate - itemDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    }
  };

  return (
    <section className="px-3 mt-12">
      <h2 className="font-bold text-[28px] font-lato leading-tight border-b-[2px] mb-2 border-gray-300 pb-2">
        Market News
      </h2>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="mt-6">
            {feedData.map((item, index) => (
              <div key={index} className="mb-6">
                <Link href={item.link} target="_blank">
                  <img
                    src={item.description.match(/<img[^>]+src="([^">]+)"/)[1]}
                    alt="Image"
                  />
                  <h3 className="capitalize font-bold leading-none mt-2">
                    {item.title}
                  </h3>
                  <small>{formatTimeAgo(item.publishDateFormatted)}</small>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MarketNews;
