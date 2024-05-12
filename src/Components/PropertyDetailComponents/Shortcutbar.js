import React from 'react'
import logo from '../assets/logo.png';
import { Link } from "react-router-dom";
import { BsFlag } from "react-icons/bs";
import { TiBookmark } from "react-icons/ti";
import { AiOutlineSend, AiOutlineUser } from "react-icons/ai";
import { Link as LinkScroll } from 'react-scroll'

const Shortcutbar = () => {
  return (
    <div className = "sticky top-0 z-50 bg-white shadow-lg shadow-gray-200">
        <div className = "flex justify-between items-center sm:mx-6 md:mx-12 lg:mx-12">
            {/* Left */}
            <div className = " h-[4rem] flex">
                <Link to = "/"><img src = {logo} className = "h-[4rem] flex object-cover" /></Link>
            </div>
            {/* Middle Left */}
            <div className = "lg:flex gap-5">
                <LinkScroll to= 'carousel' smooth={true} duration={500}><button>Overview</button></LinkScroll>
                <LinkScroll to= 'about' smooth={true} duration={500}><button>About</button></LinkScroll>
                <LinkScroll to= 'location' smooth={true} duration={500}><button>Location</button></LinkScroll>
                <LinkScroll to= 'mortgage' smooth={true} duration={500}><button>Mortgage</button></LinkScroll>
                <LinkScroll to= 'realEstate' smooth={true} duration={500}><button>RE Agent</button></LinkScroll>
            </div>
            {/* Middle Right */}
            <div className = "flex text-gray-600">
                <div className = "flex items-center hover:bg-gray-200 duration-200 gap-2 py-1 px-3 sm:px-4 rounded-full text-[14px] sm:text-[16px]">
                    <TiBookmark className = ""/>
                    <div className = "">Shortlist</div>
                </div>      
                <div className = "flex items-center hover:bg-gray-200 duration-200 gap-2 sm:px-4 rounded-full text-[14px] sm:text-[16px]">
                    <AiOutlineSend className = ""/>
                    <div className = "">Share</div>
                </div>
                <div className = "flex items-center hover:bg-gray-200 duration-200 gap-2 sm:px-4 rounded-full text-[14px] sm:text-[16px]">
                    <BsFlag className = ""/>
                    <div className = "">Report</div>
                </div>  
            </div>
            {/* Right */}
            <div className = "flex items-center pr-2 font-semibold text-gray-600">
                <div className = "flex items-center gap-3 border px-3 py-2 rounded-full bg-[#ff5a60] text-white font-bold shadow-lg shadow-gray-300 hover:bg-[#f9787c] duration-100 ease-out">
                    <p>Sign in</p>
                    <AiOutlineUser className = "text-[22px]"/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Shortcutbar