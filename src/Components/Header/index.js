import React, { useContext } from "react";
import logo from "../../Assets/logo/logo-title.png";
import "./styles.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LanguageIcon from "@mui/icons-material/Language";
import BasicMenu from "./ProfileMenu";
import SimpleBottomNavigation from "./BottomNav";
import MobileSearchBar from "../MobileSearchBar";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

function Header() {
  const { currentUser } = useContext(AuthContext);
  const userType = currentUser ? currentUser.userType : null;
  return (
    <div className="navbar">
      <div className=" h-[4rem] flex">
        {userType === "buyer" ? (
          <Link to="/buyerHomePage">
            <img src={logo} alt="logo" className="h-[4rem] flex object-cover" />
          </Link>
        ) : userType === "seller" ? (
          <Link to="/sellerHomePage">
            <img src={logo} alt="logo" className="h-[4rem] flex object-cover" />
          </Link>
        ) : userType === "realEstateAgent" ? (
          <Link to="/realEstateAgentHomePage">
            <img src={logo} alt="logo" className="h-[4rem] flex object-cover" />
          </Link>
        ) : (
          <Link to="/">
            <img src={logo} alt="logo" className="h-[4rem] flex object-cover" />
          </Link>
        )}
      </div>
      <div className="search-bar">
        <div className="search-bar-text">Anywhere</div>
        <div className="search-bar-text">Any Week</div>
        <div className="search-bar-text2">Add guests</div>
        <div className="search-icon-div">
          <SearchRoundedIcon className="search-icon" />
        </div>
      </div>
      <div className="profile-container">
        <div className="showUserName">
          Welcome {currentUser ? currentUser.username : ""}
        </div>
        <div className="showUserName">
          <LanguageIcon sx={{ fontSize: "1.3rem" }} />
        </div>
        <div className="profile-div">
          <BasicMenu />
        </div>
      </div>
      <MobileSearchBar />
      <SimpleBottomNavigation />
    </div>
  );
}

export default Header;
