import React, { useEffect, useState } from "react";
import LogoutBtn from "../../Utils/logoutBtn";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import avatar from "../../Assets/profile.png";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { list, list2 } from "../../Assets/cards-list";
import Filter from "../../Components/Filter";
import Cards from "../../Components/Cards";
import Header from "../../Components/Header";

const SellerHomePage = () => {
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
      {selectedFilter == 0 ? <Cards list={list} /> : <Cards list={list2} />}
    </div>
  );
};

export default SellerHomePage;
