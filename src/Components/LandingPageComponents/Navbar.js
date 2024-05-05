import React from "react";
import logo from "../../Assets/logo.png";
import { BiWorld } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="border-b sticky top-0 z-50 bg-white">
      <div className="flex justify-between items-center border-b sm:mx-6 md:mx-12 lg:mx-12">
        {/* Left */}
        <div className=" h-20 flex">
          <img src={logo} className="object-cover" />
        </div>
        {/* Middle */}
        <div className="hidden lg:flex justify-center items-center relative shadow-sm shadow-gray-300 border rounded-full">
          <input
            type="search"
            placeholder=""
            className="py-2.5 w-[20rem] rounded-full outline-0"
          />
          <div className="flex justify-between absolute w-full pr-16 pl-6 font-semibold text-gray-600">
            <button className="w-full">Place</button>
            <button className="border-l border-x px-6">Time</button>
            <button className="w-full text-gray-600/60 pl-2">Group Size</button>
          </div>
          <div className="bg-[#ff5a60] p-2 rounded-full mr-2">
            <FiSearch className="text-white" />
          </div>
        </div>
        {/* Right */}
        <div className="flex items-center pr-2 font-semibold text-gray-600">
          <p className="text-[17px]">Rent House</p>

          <div className="flex items-center mx-8 gap-1">
            <BiWorld className="" />
            <div className="">EN</div>
          </div>

          <div className="flex items-center gap-3 border px-3 py-2 rounded-full bg-[#ff5a60] text-white font-bold shadow-lg shadow-gray-300 hover:bg-[#f9787c] duration-100 ease-out">
            <Link to="/signin">
              <Button color="secondary">Sign In</Button>
            </Link>
            <AiOutlineUser className="text-[22px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
