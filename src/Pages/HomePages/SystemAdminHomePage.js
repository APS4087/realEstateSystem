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
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import AccountPic from "../../Assets/adminPhotos/Account.jpg";
import AdminProfile from "../../Assets/adminPhotos/Profile.png";

const SystemAdminHomePage = () => {
  const { currentUser } = useContext(AuthContext);

  const [selectedFilter, setSelectedFilter] = useState(0);

  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <div>
        <div className="flex flex-col items-center">
          <div className="flex space-x-5">
            <div className="flex flex-col items-center justify-center">
              <Link to={"/adminUserAccountPage"}>
                <img src={AccountPic} className="w-24 h-24 mb-2" />

                <Button className="bg-green-500 text-gray-900 h-10 px-5 font-semibold rounded-md cursor-pointer">
                  User Account Feature
                </Button>
              </Link>
            </div>

            <div className="flex flex-col items-center justify-center">
              <Link to={"/adminUserProfilePage"}>
                <img src={AdminProfile} className="w-24 h-24 mb-2" />

                <Button className="bg-green-500 text-gray-900 h-10 px-5 font-semibold rounded-md cursor-pointer">
                  User Profile Feature
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAdminHomePage;
