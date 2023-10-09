import Image from "next/image";
import Link from "next/link";
import React from "react";

const logoImg =
  "https://res.cloudinary.com/juadeb/image/upload/v1696431204/BDFX/bdfx_fx_tts8nv.png";

const Footer = () => {
  return (
    <footer className="mt-14 sm:mt-32 w-full sm:w-[90%] px-5 sm:px-0 m-auto h-max sm:h-[50vh] font-lato pb-10">
      <section className="flex flex-col sm:flex-row items-start justify-between gap-[5%]">
        <div className="basis-[23%] text-start">
          <Image
            src={logoImg}
            width={200}
            height={200}
            alt="Logo Image"
            className="self-start m-auto mb-0 sm:mb-2"
          />
          <p className="">
            Business day is a leader in financial and forex business news,
            insight and informed commentary plus all that matters in the
            financial affairs of West Africa
          </p>
        </div>
        <div className="basis-[23%]">
          <h3 className="text-[#F91212] font-lato text-xl uppercase">More</h3>
          <div className="flex flex-col mt-4 space-y-5">
            <Link className="pb-2" href="/">
              Rates
            </Link>
            <Link className="pb-2" href="/businessnews">
              Business News
            </Link>
            <Link className="pb-2" href="/analytics">
              Analytics
            </Link>
            <Link
              className="pb-2"
              href="https://conferences.businessday.ng/"
              target="_blank"
            >
              BD Conferences
            </Link>

            <Link className="pb-2" href="/contact">
              Contact
            </Link>
          </div>
        </div>
        <div className="basis-[23%]">
          <h3 className="text-[#F91212] font-lato text-xl uppercase">
            OTHER PAGES
          </h3>
          <div className="flex flex-col mt-4 space-y-5">
            <Link
              className="pb-2"
              href="https://businessday.ng/category/news/legal-business/"
            >
              Legal Business
            </Link>
            <Link
              className="pb-2"
              href="https://businessday.ng/category/real-estate/"
            >
              Real Estate
            </Link>
            <Link
              className="pb-2"
              href="https://businessday.ng/category/transport/"
            >
              Transportation
            </Link>
            <Link
              className="pb-2"
              href="https://conferences.businessday.ng/"
              target="_blank"
            >
              BD Conferences & Events
            </Link>

            <Link
              className="pb-2"
              href="https://businessday.ng/category/banking/"
            >
              Banking
            </Link>
          </div>
        </div>
        <div className="basis-[23%]">
          <h3 className="text-[#F91212] font-lato text-xl uppercase">
            Newsletter
          </h3>
          <p className="mt-3 mb-3">
            Get more business and financial news, insight and informed
            commentary plus all that matters in West Africa
          </p>

          <form className="">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="search"
                class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#f91212] focus:border-[#f91212] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#f91212] dark:focus:border-[#f91212]"
                required
              />
              <button
                type="submit"
                class="text-white absolute right-2.5 bottom-1 bg-[#f91212] hover:bg-[#f91212] focus:ring-4 focus:outline-none focus:ring-[#f91212] font-medium rounded-full px-4 py-2 dark:bg-[#f91212] dark:hover:bg-[#f91212] dark:focus:ring-[#f91212]"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>
      <section></section>
    </footer>
  );
};

export default Footer;
