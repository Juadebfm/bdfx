import Image from "next/image";
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import format from "date-fns/format";
import Link from "next/link";

const Markets = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = format(today, "EEEE, MMMM dd, yyyy"); // Format the date
    setCurrentDate(formattedDate);
  }, []);

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
            autoPlay
            infiniteLoop
            interval={5000}
            showArrows={false}
            showStatus={false}
            // showIndicators={false}
            className="h-full"
          >
            <Link
              href="https://businessday.ng/companies/article/uba-zenith-gtco-lead-nigerias-7-most-profitable-firms/"
              target="_blank"
            >
              <div className="font-lato">
                <Image
                  src="https://res.cloudinary.com/juadeb/image/upload/v1696815311/BDFX/nigerian-banks_hizkxd.webp"
                  width={636}
                  height={305}
                  alt="Markets"
                />
                <h2 className="font-roboto text-3xl font-extrabold text-start leading-tight mt-3">
                  UBA, Zenith, GTCO lead Nigeria’s 7 most profitable firms
                </h2>
                <small className="flex items-start justify-start gap-8 mt-1">
                  <span className="font-roboto text-[12px]">
                    Eniola Olatunji{" "}
                  </span>
                  <span className="font-roboto text-[12px] italic">
                    {currentDate}
                  </span>
                </small>
                <p className="text-base text-start">
                  Five banks, a cement maker and a telecommunication company
                  were among Nigeria’s seven most profitable publicly-listed
                  companies in the first...
                </p>
              </div>
            </Link>
            <Link
              href="https://businessday.ng/uncategorized/article/imf-teaches-central-banks-on-managing-inflation-expectations/"
              target="_blank"
            >
              <div className="font-lato">
                <Image
                  src="https://res.cloudinary.com/juadeb/image/upload/v1696815311/BDFX/IMF-1_d75lbm.webp"
                  width={636}
                  height={305}
                  alt="Markets"
                />
                <h2 className="font-roboto text-3xl font-extrabold text-start leading-tight mt-3">
                  IMF teaches Central Banks on managing inflation expectations
                </h2>
                <small className="flex items-start justify-start gap-8 mt-1">
                  <span className="font-roboto text-[12px]">
                    Hope Moses-Ashike
                  </span>
                  <span className="font-roboto text-[12px] italic">
                    {currentDate}
                  </span>
                </small>
                <p className="text-base text-start">
                  In its recent report, the International Monetary Fund (IMF)
                  exposed Central Banks on how managing inflation expectations
                  can help economies achieve a softer landing...
                </p>
              </div>
            </Link>
            <Link
              href="https://businessday.ng/markets/article/stocks-gain-n179bn-in-week-ended-october-6/"
              target="_blank"
            >
              <div className="font-lato">
                <Image
                  src="https://res.cloudinary.com/juadeb/image/upload/v1696815600/BDFX/stock-market-1_zt8dkk.webp"
                  width={636}
                  height={305}
                  alt="Markets"
                />
                <h2 className="font-roboto text-3xl font-extrabold text-start leading-tight mt-3">
                  Stocks gain N179bn in week ended October 6
                </h2>
                <small className="flex items-start justify-start gap-8 mt-1">
                  <span className="font-roboto text-[12px]">
                    Iheanyi Nwachukwu
                  </span>
                  <span className="font-roboto text-[12px] italic">
                    {currentDate}
                  </span>
                </small>
                <p className="text-base text-start">
                  In the trading week ended Friday October 6, Nigeria’s equities
                  market rose by 0.11percent while investors booked N179billion
                  gain...
                </p>
              </div>
            </Link>
            <Link
              href="https://businessday.ng/markets/article/first-naira-denominated-infrastructure-fund-lists-on-ngx/"
              target="_blank"
            >
              <div className="font-lato">
                <Image
                  src="https://res.cloudinary.com/juadeb/image/upload/v1696815311/BDFX/NGX._kjeua5.webp"
                  width={636}
                  height={305}
                  alt="Markets"
                />
                <h2 className="font-roboto text-3xl font-extrabold text-start leading-tight mt-3">
                  First naira denominated infrastructure fund lists on NGX
                </h2>
                <small className="flex items-start justify-start gap-8 mt-1">
                  <span className="font-roboto text-[12px]">
                    Iheanyi Nwachukwu
                  </span>
                  <span className="font-roboto text-[12px] italic">
                    {currentDate}
                  </span>
                </small>
                <p className="text-base text-start">
                  The first local currency-denominated infrastructure investment
                  trust fund in Nigeria and Sub-Saharan Africa, Nigeria
                  Infrastructure Debt Fund (NIBF) has been listed on Nigerian
                  Exchange Limited (NGX).
                </p>
              </div>
            </Link>
          </Carousel>
        </div>
        <div className="w-full sm:w-[35%]">
          <h3 className="text-start font-lato uppercase font-bold tracking-wide border-b-4 border-gray-300 mb-2">
            <span className="underline decoration-[#F91212] underline-offset-[6px] decoration-4">
              Recent News
            </span>
          </h3>

          <div className="text-start border-l-4 border-gray-300 hover:border-[#F91212] duration-150 transition-all ease-linear px-5 mb-4">
            <Link
              href="https://businessday.ng/category/markets/"
              target="_blank"
            >
              <p className="text-lato font-semibold">
                Read More Market News to get attuned with current news about the
                current financials states
              </p>
              <small>Just Now</small>
            </Link>
          </div>
          <div className="text-start border-l-4 border-gray-300 hover:border-[#F91212] duration-150 transition-all ease-linear px-5 mb-4">
            <Link
              href="https://businessday.ng/news/article/naira-faces-further-weakness-amid-dollar-shortage-fitch-says/"
              target="_blank"
            >
              <p className="text-lato font-semibold">
                Naira faces further weakness amid dollar shortage, Fitch says
              </p>
              <small>{currentDate}</small>
            </Link>
          </div>
          <div className="text-start border-l-4 border-gray-300 hover:border-[#F91212] duration-150 transition-all ease-linear px-5 mb-4">
            <Link
              href="https://businessday.ng/markets/article/netherlands-tops-nigerias-export-destination-in-q2/"
              target="_blank"
            >
              <p className="text-lato font-semibold">
                Netherlands tops Nigeria’s export destination in Q2
              </p>
              <small>{currentDate}</small>
            </Link>
          </div>
          <div className="text-start border-l-4 border-gray-300 hover:border-[#F91212] duration-150 transition-all ease-linear px-5 mb-4">
            <Link
              href="https://businessday.ng/markets/article/lagos-leads-league-of-outperformers-in-nigerias-socioeconomic-scorecard/"
              target="_blank"
            >
              <p className="text-lato font-semibold">
                Lagos leads league of outperformers in Nigeria’s socioeconomic
                scorecard
              </p>
              <small>October 4, 2023</small>
            </Link>
          </div>
          <div className="text-start border-l-4 border-gray-300 hover:border-[#F91212] duration-150 transition-all ease-linear px-5 mb-4">
            <Link
              href="https://businessday.ng/companies/article/dangote-lafarge-bua-post-highest-profit-margins-among-global-peers-2/"
              target="_blank"
            >
              <p className="text-lato font-semibold">
                Dangote, Lafarge, BUA post highest profit margins among global
                peers
              </p>
              <small>October 9, 2023</small>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Markets;
