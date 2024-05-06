import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { list, list2 } from "../../Assets/cards-list";
import Filter from "../../Components/Filter";
import Header from "../../Components/Header";
import Cards from "../../Components/Cards";

const LandingPage = () => {
  const [selectedFilter, setSelectedFilter] = useState(0);
  return (
    <div className="App">
      <Header />
      <Filter
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      {selectedFilter == 0 ? <Cards list={list} /> : <Cards list={list2} />}
    </div>
  );
};

export default LandingPage;
