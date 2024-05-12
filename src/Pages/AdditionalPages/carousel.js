import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const carousel = ({ images }) => {
  return (
    <div className="w-[65rem] mx-auto" name="carousel">
      <Carousel
        className="w-full py-7 rounded-[1.5rem]"
        thumbWidth={120}
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={true}
        showStatus={false}
      >
        {images.map((property, index) => {
          return (
            <div key={index} className="w-full h-full">
              <img
                src={property}
                alt={`house-${index}`}
                className="w-full h-full object-contain rounded-[1.5rem]"
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default carousel;
