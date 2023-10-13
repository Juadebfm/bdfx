import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Line from "./Line";

const MySwiper = () => {
  return (
    <div className="mt-14 px-5 sm:px-0 sm:mt-32 w-full sm:w-[80%] m-auto h-96 text-white">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={5000}
        showArrows={false}
        showStatus={false}
      >
        <div className="h-96 bg-blue-500">
          <Line />{" "}
        </div>
        <div className="h-96 bg-red-500">
          <h1>Here</h1>
        </div>
        <div className="h-96 bg-green-500">
          <h1>Here</h1>
        </div>
        <div className="h-96 bg-yellow-500">
          <h1>Here</h1>
        </div>
      </Carousel>
    </div>
  );
};

export default MySwiper;
