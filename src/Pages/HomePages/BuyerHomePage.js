import React, { useEffect, useState } from "react";
import LogoutBtn from "../../Utils/logoutBtn";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import avatar from "../../Assets/profile.png";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { list, list2 } from "../../Assets/cards-list";
import Filter from "../../Components/Filter";
import { Rentals } from "../../Components/Cards/Rentals";
import Header from "../../Components/Header";
import { rentalsData } from "../../Assets/data";

const BuyerHomePage = () => {
  const { currentUser } = useContext(AuthContext);
  /* const userType = currentUser ? currentUser.userType : null;
  const navigate = useNavigate();
  
  useEffect(() => {
    if (userType !== "buyer") {
      navigate("..");
    }
  }, [userType, navigate]); */

  const customProfilePic = currentUser ? currentUser.profilePic : null;

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

export default BuyerHomePage;
