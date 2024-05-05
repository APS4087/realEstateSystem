import React from "react";
import { BsStarFill } from "react-icons/bs";

const Rental = ({ title, image, price }) => {
  return (
    <div classname="">
      <div className="relative">
        <div className="grad absolute h-full w-full rounded-b-[1.3rem]"></div>
        <div className="flex">
          {/* BackGround */}
          <img
            src={image}
            alt=""
            className="object-cover rounded-[1.3rem] sm:h-[17rem] md:h-[13rem] w-full"
          />
          {/* Title */}
          <div className="absolute text-white font-bold bottom-6 left-6 text-[22px] flex items-center gap-2">
            {title}
            <span>&#x2022;</span>
            <p className="text-[18px] text-gray-200">${price}</p>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="pt-2 flex justify-between items-start">
        {/* Left */}
        <div className="">
          <p className="max-w-[17rem] font-semibold text-[17px]">
            This is a rare find
          </p>
          <p className="max-w-[17rem] -mt-1 text-gray-500">Jan 28 - Aug 9</p>
          <p className="max-w-[17rem] font-semibold text-[17px]">${price}</p>
        </div>
        {/* Right */}
        <div className="flex items-center space-x-1">
          <BsStarFill />
          <p className="text-[15px]">5.0</p>
        </div>
      </div>
    </div>
  );
};

export default Rental;
