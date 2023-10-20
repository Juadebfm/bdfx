import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Line from "./Line";
import LineTwo from "./LineTwo";

const MySwiper = () => {
  return (
    <div className="mt-4 px-5 sm:px-0 sm:mt-8 w-full sm:w-[80%] m-auto h-max hidden sm:block text-white">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={5000}
        showArrows={false}
        showStatus={false}
      >
        <div className="h-max w-[100%] pb-10">
          <Line />
        </div>
        <div className="h-max w-[100%]">
          <LineTwo />
        </div>
      </Carousel>
    </div>
  );
};

export default MySwiper;
