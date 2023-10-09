import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const MySwiper = () => {
  // /// Save the converted rates in local storage
  // const formattedRatesData = localStorage.getItem(
  //   "convertedRates",
  //   JSON.parse(formattedRatesData)
  // );
  return (
    <div className="mt-14 px-5 sm:px-0 sm:mt-32 w-full sm:w-[80%] m-auto">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={5000}
        showArrows={false}
        showStatus={false}
      >
        {/* {formattedRatesData.map((rate, index) => (
          <div key={index} className="flex flex-col mt-5">
            <div className="border border-black h-[450px]">
              {rate.props.children.props.children}
            </div>
          </div>
        ))} */}
      </Carousel>
    </div>
  );
};

export default MySwiper;
