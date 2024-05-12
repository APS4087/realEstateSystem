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
import RealEstateAgentEntity from "../../Backend/Entity/RealEstateAgentEntity";
import { rentalsData } from "../../Assets/data";

// TODO: ADD RENTAL ID

const RealEsateAgentHomePage = () => {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchPendingProperties = async () => {
      if (currentUser && currentUser.uid) {
        const realEstateAgentEntity = new RealEstateAgentEntity();
        const pendingProperties =
          await realEstateAgentEntity.getPendingProperties(currentUser.uid);
        setUserData(pendingProperties);
      }
    };

    fetchPendingProperties();
  }, [currentUser]);
  const [selectedFilter, setSelectedFilter] = useState(0);

  console.log(userData);
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

export default RealEsateAgentHomePage;
