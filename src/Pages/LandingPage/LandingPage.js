import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { list, list2 } from "../../Assets/cards-list";
import Filter from "../../Components/Filter";
import Header from "../../Components/Header";
import { Rentals } from "../../Components/Cards/Rentals";
import { rentalsData } from "../../Assets/data";

const LandingPage = () => {
  const [selectedFilter, setSelectedFilter] = useState(0);
  return (
    <div className="App">
      <Header />
      <Filter
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <div className="sm:mx-6 md:mx-10 lg:mx-12 px-3">
        <Rentals properties={rentalsData} />
      </div>
    </div>
  );
};

export default LandingPage;
