import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../../Components/LandingPageComponents/Navbar";
import Filters from "../../Components/LandingPageComponents/Filters";
import Rentals from "../../Components/LandingPageComponents/Rentals";
import Footer from "../../Components/LandingPageComponents/Footer";

const LandingPage = () => {
  return (
    <div className="">
      {/* Navbar */}
      <Navbar />
      {/* Filters */}
      <div className="sm:mx-6 md:mx-10 lg:mx-12 px-3">
        <Filters />
        {/* Rentals */}
        <Rentals />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
