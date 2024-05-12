import React, { useEffect, useState } from "react";

import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";

import Filter from "../../../Components/Filter";
import PendingRentals from "../../../Components/Cards/RealEstateCards/PendingRentals";
import Header from "../../../Components/Header";
import RealEstateAgentEntity from "../../../Backend/Entity/RealEstateAgentEntity";

// TODO: ADD RENTAL ID

const PendingPropertiesPage = () => {
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
        <PendingRentals properties={userData} />
      </div>
    </div>
  );
};

export default PendingPropertiesPage;
