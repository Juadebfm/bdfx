import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiFacebookLine } from "react-icons/ri";
import { RiTwitterXFill } from "react-icons/ri";
import { AiOutlineInstagram } from "react-icons/ai";
import { TfiYoutube } from "react-icons/tfi";
import { FaTelegram } from "react-icons/fa";

const logoImg =
  "https://res.cloudinary.com/juadeb/image/upload/v1696431204/BDFX/bdfx_fx_tts8nv.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-t-black w-full m-auto mt-8 sm:mt-0 px-5 sm:px-10 pt-8 sm:pt-12 sm:h-[50vh] font-lato text-[14px] text-gray-800 h-full">
      <section className="flex flex-col lg:flex-row items-start justify-between gap-[5%] mb-6">
        <div className="basis-[23%] flex flex-col items-start justify-start">
          <Image
            src={logoImg}
            width={200}
            height={200}
            alt="Logo Image"
            className="m-auto mb-4 -ml-[0.16rem]"
          />
          <p className="mb-4">
            Business day is a leader in financial and forex business news,
            insight and informed commentary plus all that matters in the
            financial affairs of West Africa
          </p>
          <div className="mt-3 mb-7 flex items-center justify-center gap-6 transition-all duration-200 ease-linear">
            <Link
              target="_blank"
              href="https://www.facebook.com/businessdayng/"
            >
              <RiFacebookLine className="border border-slate-500 text-slate-800 rounded-full p-2 h-10 w-10 cursor-pointer hover:bg-black hover:text-white" />
            </Link>
            <Link target="_blank" href="https://twitter.com/BusinessDayNg">
              <RiTwitterXFill className="border border-slate-500 text-slate-800 rounded-full p-2 h-10 w-10 cursor-pointer hover:bg-black hover:text-white" />
            </Link>
            <Link
              target="_blank"
              href="https://www.instagram.com/businessdayng/"
            >
              <AiOutlineInstagram className="border border-slate-500 text-slate-800 rounded-full p-2 h-10 w-10 cursor-pointer hover:bg-black hover:text-white" />
            </Link>
            <Link
              target="_blank"
              href="https://www.youtube.com/channel/UCsVZWCV-LutMa89JgR8-KGw"
            >
              <TfiYoutube className="border border-slate-500 text-slate-800 rounded-full p-2 h-10 w-10 cursor-pointer hover:bg-black hover:text-white" />
            </Link>
            <Link target="_blank" href="https://t.me/businessday1">
              <FaTelegram className="border border-slate-500 text-slate-800 rounded-full p-2 h-10 w-10 cursor-pointer hover:bg-black hover:text-white" />
            </Link>
          </div>
        </div>
        <div className="my-5 lg:my-0 basis-[23%]">
          <h3 className="text-[#F91212] font-lato text-base font-bold uppercase">
            More
          </h3>
          <div className="flex flex-col mt-4 space-y-5">
            <Link className="" href="/currentrates">
              Current Rates
            </Link>

            <Link href="mailto:subscription@business.ng">
              For Digital Adverts: <br /> subscription@business.ng
            </Link>

            <Link href="tel:+2348068545123">
              Phone: <br /> +2348068545123
            </Link>

            <Link href="mailto:customercare@businessday.ng">
              Customer Care: <br /> customercare@businessday.ng
            </Link>

            <Link href="/contact">Other Contact Information</Link>
          </div>
        </div>
        <div className="my-5 lg:my-0 basis-[23%]">
          <h3 className="text-[#F91212] font-lato font-bold text-base uppercase">
            OTHER PAGES
          </h3>
          <div className="flex flex-col mt-4 space-y-5">
            <Link className="" href="https://businessday.ng/" target="_blank">
              Business News
            </Link>
            <Link
              className=""
              href="https://businessday.ng/category/art-and-travel/"
              target="_blank"
            >
              Travel
            </Link>
            <Link
              className=""
              href="https://businessday.ng/category/sports/"
              target="_blank"
            >
              Sports
            </Link>
            <Link
              className=""
              href="https://conferences.businessday.ng/"
              target="_blank"
            >
              BD Conferences
            </Link>
            <Link href="https://businessday.ng/advert-and-rates/">
              Adverts & Rates
            </Link>
            <Link href="/terms">Terms & Conditions</Link>
          </div>
        </div>
        <div className="my-5 lg:my-0 basis-[23%]">
          <h3 className="text-[#F91212] font-lato text-base font-bold uppercase">
            Newsletter
          </h3>
          <p className="mt-3 mb-3">
            Get more business and financial news, insight and informed
            commentary plus all that matters in West Africa
          </p>

          <form className="">
            <div className="relative font-lato text-base">
              <input
                type="search"
                id="search"
                className="block w-full p-4 pl-4 text-inherit text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#f91212] focus:border-[#f91212] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#f91212] dark:focus:border-[#f91212]"
                required
              />
              <button
                type="submit"
                className="bg-[#F91212] hover:bg-[#F91212]/80 transition-all duration-150 ease-linear text-white w-[300px] h-[50px] text-lg rounded-md mt-4"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>
      <section className="text-slate-500 text-sm font-lato mt-3 mb-20 sm:mb-4 text-center sm:text-start">
        <p>© {currentYear} - Businessday NG. All Rights Reserved.</p>
      </section>
    </footer>
  );
};

export default Footer;
