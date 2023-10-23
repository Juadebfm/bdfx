"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Parser from "rss-parser";

const Abokifxnews = () => {
  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const parser = new Parser();
    const rssUrl = "https://www.coindesk.com/arc/outboundfeeds/rss/";

    const fetchData = async () => {
      try {
        const feed = await parser.parseURL(rssUrl);
        console.log(feed);
        setFeedData(feed.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching RSS feed:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const businessdayItems = feedData.filter((item) =>
    item.link.endsWith("businessday")
  );

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
    <div>
      <h2 className="font-bold text-[28px] font-lato leading-tight">
        Business News
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="mt-2">
          {businessdayItems.map((item, index) => (
            <div key={index} className="mb-6">
              <Link href={item.link} target="_blank">
                <h3 className="capitalize font-bold leading-tight">
                  {item.title}
                </h3>
                <small className="italic font-medium">{formatTimeAgo(item.pubDate)}</small>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Abokifxnews;
