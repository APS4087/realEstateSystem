import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const carousel = ({ images }) => {
  return (
    <div className="w-[50rem] mx-auto" name="carousel">
      <Carousel
        className="w-full py-10 rounded-[1.5rem]"
        thumbWidth={120}
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        dynamicHeight={true}
      >
        {images.map((property, index) => {
          return (
            <div key={index} className="w-[10rem] h-[30rem]">
              <img
                src={property}
                alt={`house-${index}`}
                className="w-[10rem] h-[23rem] rounded-[1.5rem]"
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default carousel;
