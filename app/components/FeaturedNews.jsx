import Image from "next/image";
import Link from "next/link";
import React from "react";

const FeaturedNews = () => {
  return (
    <section className="mt-14 sm:mt-32 w-full sm:w-[80%] px-5 sm:px-0 m-auto text-center">
      <h1 className="font-bold text-[42px] font-lato text-center">
        Featured News
      </h1>
      <p className="font-roboto text-black uppercase font-bold text-xl mt-4 mb-0">
        Special Columns
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-between mt-8">
        <Link
          className="w-full sm:w-[33%] h-[300px] mb-5"
          href="https://businessday.ng/columnist/article/the-sad-and-not-so-sad-lyrics-of-mohbad/"
        >
          <div className="shadow-lg hover:shadow-2xl transition-all duration-150 ease-linear p-3 rounded-md">
            <Image
              src="https://res.cloudinary.com/juadeb/image/upload/v1696822115/BDFX/MohBad_lcy0e4.webp"
              width={0}
              height={200}
              objectFit="cover"
              className="!w-full"
              alt="Mohbad"
              unoptimized
            />
            <div>
              <h3 className="text-center font-lato text-[#F91212] capitalize font-bold mt-4">
                The sad, and not so sad, lyrics of MohBad
              </h3>
              <p className="font-roboto text-[15px] truncate">
                It is no longer the soft dulcet voice of youth apologising for
                the bad things he has had to do on his journey up.
              </p>
            </div>
          </div>
        </Link>
        <Link
          className="w-full sm:w-[33%] h-[300px]"
          href="https://businessday.ng/columnist/article/detoxifying-leadership-a-guide-to-surviving-workplace-humiliation/"
        >
          <div className="shadow-lg hover:shadow-2xl transition-all duration-150 ease-linear p-3 rounded-md">
            <Image
              src="https://res.cloudinary.com/juadeb/image/upload/v1696822115/BDFX/leadership-failure_qcyr3j.webp"
              width={0}
              height={200}
              objectFit="cover"
              className="!w-full"
              alt="Mohbad"
              unoptimized
            />
            <div>
              <h3 className="text-center font-lato text-[#F91212] capitalize font-bold mt-4">
                Detoxifying leadership: A guide to surviving workplace
                humiliation
              </h3>
              <p className="font-roboto text-[15px] truncate">
                In an ideal world, every workplace would be a haven of
                creativity, collaboration, and mutual respect. However, reality
                often paints a different picture.
              </p>
            </div>
          </div>
        </Link>
        <Link
          className="w-full sm:w-[33%] h-[300px]"
          href="https://businessday.ng/columnist/article/nigeria-at-63-an-appraisal-of-the-language-situation/"
        >
          <div className="shadow-lg hover:shadow-2xl transition-all duration-150 ease-linear p-3 rounded-md">
            <Image
              src="https://res.cloudinary.com/juadeb/image/upload/v1696822115/BDFX/Nigeria_nnmx1v.webp"
              width={0}
              height={200}
              objectFit="cover"
              className="!w-full"
              alt="Mohbad"
              unoptimized
            />
            <div>
              <h3 className="text-center font-lato text-[#F91212] capitalize font-bold mt-4">
                Nigeria at 63: An appraisal of the language situation
              </h3>
              <p className="font-roboto text-[15px] truncate">
                It is no longer the soft dulcet voice of youth apologising for
                the bad things he has had to do on his journey up.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedNews;
