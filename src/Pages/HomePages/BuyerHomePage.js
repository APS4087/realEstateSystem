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
import ViewPropertyController from "../../Controllers/PropertyControllers/ViewPropertyController";
import Footer from "../../Components/Footer";

const BuyerHomePage = () => {
  const { currentUser } = useContext(AuthContext);

  const [selectedFilter, setSelectedFilter] = useState(0);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const viewPropertyController = new ViewPropertyController();
      const properties = await viewPropertyController.getProperties();
      setProperties(properties);
    };

    fetchProperties();
  }, []);
  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <Filter
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <div className="sm:mx-6 md:mx-10 lg:mx-12 px-3">
        <Rentals properties={properties} />
      </div>
      <Footer />
    </div>
  );
};

export default BuyerHomePage;
