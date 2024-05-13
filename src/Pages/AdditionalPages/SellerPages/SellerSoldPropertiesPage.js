import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import Filter from "../../../Components/Filter";
import Header from "../../../Components/Header";
import SoldRentals from "../../../Components/Cards/SoldRentals/SoldRentals";
import ViewSoldPropertiesController from "../../../Controllers/SellerControllers.js/ViewSoldPropertiesController";

const SellerSoldPropertiesPage = () => {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const sellerViewSoldProperties = new ViewSoldPropertiesController();

  useEffect(() => {
    const fetchBoughtProperties = async () => {
      if (currentUser && currentUser.uid) {
        const soldProperties = await sellerViewSoldProperties.getSoldProperties(
          currentUser.uid
        );
        setUserData(soldProperties);
      }
    };

    fetchBoughtProperties();
  }, [currentUser]);

  const [selectedFilter, setSelectedFilter] = useState(0);

  return (
    <div className="App">
      <Header />
      <Filter
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <div className="sm:mx-6 md:mx-10 lg:mx-12 px-3">
        <SoldRentals properties={userData} />
      </div>
    </div>
  );
};

export default SellerSoldPropertiesPage;
