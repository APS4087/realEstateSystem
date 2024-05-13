import React, { useEffect, useState } from "react";

import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { Rentals } from "../../../Components/Cards/Rentals";

import Filter from "../../../Components/Filter";

import Header from "../../../Components/Header";

import RealEstateAgentEntity from "../../../Backend/Entity/RealEstateAgentEntity";

import { doc, db, getDoc } from "firebase/firestore";
import PropertyController from "../../../Controllers/PropertyControllers/PropertyController";

const ListedAgentPropertiesPage = () => {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchBoughtProperties = async () => {
      if (currentUser && currentUser.uid) {
        const propertyController = new PropertyController();
        const listedProperties = await propertyController.getListingProperties(
          currentUser.uid
        );
        setUserData(listedProperties);
      }
    };

    fetchBoughtProperties();
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
        <Rentals properties={userData} />
      </div>
    </div>
  );
};

export default ListedAgentPropertiesPage;
