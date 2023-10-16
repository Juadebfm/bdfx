import Image from "next/image";
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Link from "next/link";

const Markets = () => {
  const [marketData, setMarketData] = useState([]);
  const [newData, setNewData] = useState([]);

  // First Feed API
  const fetchData = async () => {
    const url =
      "https://feed-reader1.p.rapidapi.com/feed/parse?url=https%3A%2F%2Fbusinessday.ng%2Fcategory%2Fmarkets%2Ffeed%2F&normalization=yes&iso_date_format=yes";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "212eb6b3ddmsh09b08aa0756630cp1bad60jsnb17f34b14dea",
        "X-RapidAPI-Host": "feed-reader1.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const entries = result.data.entries || [];

      const imgUrl =
        "https://res.cloudinary.com/juadeb/image/upload/v1697462709/BDFX/Business-Day-Grey_uxkrvk.jpg";

      const formattedData = entries.map((entry) => ({
        id: entry.id,
        title: entry.title,
        link: entry.link,
        image: imgUrl,
        author: entry.author,
        description: entry.description,
        published: entry.published,
      }));

      setMarketData(formattedData);
    } catch (error) {
      console.error(error);
    }
  };
  // Second Feed API
  const fetchNewData = async () => {
    const newUrl =
      "https://feed-reader1.p.rapidapi.com/feed/parse?url=https%3A%2F%2Fbusinessday.ng%2Ffeed%2F&normalization=yes&iso_date_format=yes";
    const newOptions = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "212eb6b3ddmsh09b08aa0756630cp1bad60jsnb17f34b14dea",
        "X-RapidAPI-Host": "feed-reader1.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(newUrl, newOptions);
      const result = await response.json();
      console.log(result);
      // Extract entries from the new data
      const newEntries = result.data.entries || [];

      // Process the new data as needed
      const formattedNewData = newEntries.map((entry) => ({
        id: entry.id,
        title: entry.title,
        link: entry.link,
        published: entry.published,
      }));

      // Set the new data in the state
      setNewData(formattedNewData);
    } catch (error) {
      console.error(error);
    }
  };
  //First Feed API useEffect
  useEffect(() => {
    // Initial fetch when the component mounts
    fetchData();
    // Fetch the new data
    fetchNewData();

    // Set an interval to fetch data every 6 hours (in milliseconds)
    const intervalId = setInterval(() => {
      fetchData();
      fetchNewData();
    }, 6 * 60 * 60 * 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  function formatDateTime(dateString) {
    const postDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = Math.floor((currentDate - postDate) / 1000); // Calculate the time difference in seconds

    if (timeDifference < 60) {
      return `${timeDifference} second${timeDifference > 1 ? "s" : ""} ago`;
    } else if (timeDifference < 3600) {
      const minutesAgo = Math.floor(timeDifference / 60);
      return `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
    } else if (timeDifference < 86400) {
      const hoursAgo = Math.floor(timeDifference / 3600);
      return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
    } else {
      const daysAgo = Math.floor(timeDifference / 86400);
      return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
    }
  }

  return (
    <section className="mt-14 sm:mt-32 w-full sm:w-[80%] px-5 sm:px-0 m-auto text-center">
      <h1 className="font-bold text-[42px] font-lato">
        Latest Market Insights
      </h1>
      <p className="font-roboto text-gray-700">
        Stay Informed and Make Informed Decisions
      </p>
      <div className="w-full border border-slate-100 h-max mt-10 px-5 sm:px-14 py-20 pb-5 flex flex-col sm:flex-row items-start justify-between gap-5">
        <div className="w-full sm:w-[65%] pb-20">
          <h3 className="text-start font-lato uppercase font-bold tracking-wide border-b-4 border-gray-300 mb-2">
            <span className="underline decoration-[#F91212] underline-offset-[6px] decoration-4">
              Top Stories
            </span>
          </h3>
          <Carousel
            showThumbs={false}
            // autoPlay
            // infiniteLoop
            // interval={5000}
            showArrows={false}
            showStatus={false}
            className="h-full"
          >
            {marketData.map((item) => (
              <Link key={item.id} href={item.link} target="_blank">
                <div className="font-lato">
                  <Image
                    src={item.image}
                    width={636}
                    height={305}
                    alt="Markets"
                  />
                  <h2 className="font-roboto text-3xl font-extrabold text-start leading-tight mt-3">
                    {item.title}
                  </h2>
                  <small className="flex items-start justify-start gap-8 mt-1">
                    <span className="font-roboto text-[12px] italic">
                      {formatDateTime(item.published)}
                    </span>
                  </small>
                  <p className="text-base text-start">{item.description}</p>
                </div>
              </Link>
            ))}
          </Carousel>
        </div>
        <div className="w-full sm:w-[35%]">
          <h3 className="text-start font-lato uppercase font-bold tracking-wide border-b-4 border-gray-300 mb-2">
            <span className="underline decoration-[#F91212] underline-offset-[6px] decoration-4">
              Recent News
            </span>
          </h3>
          {newData.map((item) => (
            <div key={item.id}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <h3 className="text-2xl font-extrabold text-start leading-tight mt-3">
                  {item.title}
                </h3>
                <small className="flex items-start justify-start gap-8 mt-1">
                  <span className="font-roboto text-[12px] italic">
                    {formatDateTime(item.published)}
                  </span>
                </small>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Markets;
