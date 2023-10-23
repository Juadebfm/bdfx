"use client";

import React, { useState, useEffect } from "react";
import Parser from "rss-parser";

const Abokifxnews = () => {
  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const parser = new Parser();
    const rssUrl = "https://abokifx.com/feed.rss";

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

  return (
    <div>
      <h2>Market News</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {feedData.map((item, index) => (
            <li key={index}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Abokifxnews;
