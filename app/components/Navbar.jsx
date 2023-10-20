"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import format from "date-fns/format";
import Link from "next/link";
import { BiMenu, BiX } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const logoImg =
  "https://res.cloudinary.com/juadeb/image/upload/v1696431204/BDFX/bdfx_fx_tts8nv.png";

const Navbar = () => {
  const pathname = usePathname();
  const [currentDate, setCurrentDate] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navMenuRef = useRef(null); // Create a reference to the navigation menu

  const scrollThreshold = 200; // Adjust the threshold as needed (in pixels)

  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      // When the user has scrolled down beyond the threshold
      navMenuRef.current.style.position = "fixed";
      navMenuRef.current.style.top = "0";
    } else {
      // When the user is above the thr3shold
      navMenuRef.current.style.position = "static"; // or "relative" if you prefer
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const today = new Date();
    const formattedDate = format(today, "EEEE, MMMM dd, yyyy"); // Format the date
    setCurrentDate(formattedDate);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Set body overflow when mobile menu opens/closes
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = "auto"; // Allow scrolling
    }
  }, [isMobileMenuOpen]);

  return (
    <header className="w-full">
      <section className="w-full text-[14px] text-center sm:text-start bg-black text-white px-5 sm:px-32 py-3">
        {currentDate}
      </section>
      <section className="flex items-center justify-between px-3 sm:px-0 w-full mt-2">
        <nav className="py-0 sm:py-4 font-twenty text-[1.4rem] text-gray-800 sm:mx-auto sm:w-full">
          <div className="flex flex-col items-center justify-center border-0 sm:border-b-2 border-black pb-0">
            <Image
              src={logoImg}
              width={200}
              height={200}
              alt="Logo Image"
              className="self-start m-auto mb-0 sm:mb-2"
            />
            <div className="hidden sm:flex items-center justify-center gap-2 tracking-wide">
              <span className="uppercase font-bold">Tracking Trends</span>
              <span className="h-[20px] w-[1px] bg-black"></span>
              <span className="uppercase font-bold">Informing Decisions</span>
            </div>
            <p className="hidden sm:block md:text-center">
              Business day is a leader in financial and forex business news,
              insight and informed commentary plus all that matters in the
              financial affairs of West Africa
            </p>
            <div className="hidden sm:flex items-center justify-between font-lato text-base h-[40px] w-full mt-2 bg-black text-white">
              <motion.div
                className="w-full h-full flex items-center justify-center"
                initial={{ x: "100%" }} // Start from the right edge of the container
                animate={{ x: "-100%" }} // Move to the left edge of the container
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  repeatType: "loop",
                }} // Set animation duration and loop
              ></motion.div>
            </div>
          </div>
          <ul
            ref={navMenuRef} // Attach the reference to the ul element
            className="hidden sm:flex font-lato font-bold text-[14px] items-center justify-center gap-12 py-5 capitalize border border-b border-gray-200 bg-white fixed top-0 left-0 right-0 z-[999]"
          >
            <Link
              href="/"
              className={
                pathname == "/"
                  ? "active_class"
                  : "hover:text-slate-600 duration-200 transition-all ease-linear"
              }
              passHref
            >
              Rates
            </Link>
            <Link
              href="https://businessday.ng/"
              passHref
              className={
                pathname == "https://businessday.ng/"
                  ? "active_class"
                  : "hover:text-slate-600 duration-200 transition-all ease-linear"
              }
            >
              Business News
            </Link>
            <Link
              href="/analytics"
              className={
                pathname == "/analytics"
                  ? "active_class"
                  : "hover:text-slate-600 duration-200 transition-all ease-linear"
              }
              passHref
            >
              Analytics
            </Link>
            <Link
              href="https://conferences.businessday.ng/"
              passHref
              className={
                pathname == "https://conferences.businessday.ng/"
                  ? "active_class"
                  : "hover:text-slate-600 duration-200 transition-all ease-linear"
              }
            >
              BD Conferences
            </Link>

            <Link
              href="/contact"
              className={
                pathname == "/contact"
                  ? "active_class"
                  : "hover:text-slate-600 duration-200 transition-all ease-linear"
              }
              passHref
            >
              Contact
            </Link>
          </ul>
        </nav>
        <BiMenu
          className="sm:hidden text-4xl -mt-0 cursor-pointer"
          onClick={toggleMobileMenu}
        />
      </section>
      <ul
        id="mobile_nav"
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } absolute z-[999] top-[44.5px] px-10 flex flex-col bg-black border-t-4 border-red-600 text-white w-1/2 h-[100vh] transition-transform duration-200 ease-in-out transform`}
      >
        <Image
          src={logoImg}
          width={200}
          height={200}
          alt="Logo Image"
          className="m-auto mb-0 sm:mb-2 border border-white my-3 mt-8"
        />
        <div className="flex flex-col mt-4 space-y-5">
          <Link className="border-b border-gray-800 pb-4" href="/">
            Rates
          </Link>
          <Link
            className="border-b border-gray-800 pb-4"
            href="https://businessday.ng/"
            target="_blank"
          >
            Business News
          </Link>
          <Link className="border-b border-gray-800 pb-4" href="/analytics">
            Analytics
          </Link>
          <Link
            className="border-b border-gray-800 pb-4"
            href="https://conferences.businessday.ng/"
            target="_blank"
          >
            BD Conferences
          </Link>

          <Link className="border-b border-gray-800 pb-4" href="/contact">
            Contact
          </Link>
        </div>
        <BiX
          className="text-2xl absolute top-2 right-2 cursor-pointer"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      </ul>
    </header>
  );
};

export default Navbar;
