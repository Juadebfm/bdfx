import Link from "next/link";
import React from "react";

const CTA = () => {
  return (
    <section
      className="mt-14 w-full sm:w-[100%] px-5 sm:px-0 m-auto relative bg-cover bg-center h-[50vh]"
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/juadeb/image/upload/v1696822116/BDFX/news_mah8zg.png")',
      }}
    >
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h2 className="text-white text-5xl font-bold capitalize mb-10 px-10 sm:px-0 w-full sm:w-[50%] text-center">
          Stay Ahead with Business News from West Africa!
        </h2>
        <button className="bg-[#F91212] hover:bg-[#F91212]/80 transition-all duration-150 ease-linear text-white w-[300px] h-[50px] text-lg rounded-md">
          <Link href="https://businessday.ng/">Visit</Link>
        </button>
      </div>
    </section>
  );
};

export default CTA;
