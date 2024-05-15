import React from "react";
import { Link } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";

const UpdateRental = ({ Id, title, image, price, views, tag }) => {
  return (
    <div classname="">
      <Link to={`/updatePropertyDetail/${Id}`}>
        <div className="relative">
          <div className="grad absolute h-full w-full rounded-b-[1.3rem]"></div>
          <div className="flex">
            {/* BackGround */}
            <img
              src={image}
              alt=""
              className="object-cover rounded-[1.3rem] sm:h-[17rem] md:h-[13rem] w-full"
            />
          </div>
        </div>
      </Link>
      {/* Description */}
      <div className="pt-2 flex justify-between items-start">
        {/* Left */}
        <div className="ml-1">
          <p className="max-w-[17rem] font-bold text-[17px] pb-2">{title}</p>
          <p className="max-w-[17rem] font-semibold text-[17px] pb-3">
            ${price}
          </p>
        </div>
        {/* Right */}
        <div className="">
          <div className="flex items-center justify-end space-x-1 gap-1 pt-1 pb-2">
            <BsFillEyeFill />
            <p className="text-[15px]">{views}</p>
          </div>
          <div className="w-{$p.length*2} px-2 inline-block text-green-400 border-green-300 border-2 rounded-lg">
            <p className="font-semibold text-[15px] pb-1">{tag}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRental;
