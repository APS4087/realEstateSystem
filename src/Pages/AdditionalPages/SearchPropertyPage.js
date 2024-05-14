import Filter from "../../Components/Filter";

import Header from "../../Components/Header";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LanguageIcon from "@mui/icons-material/Language";
import BasicMenu from "../../Components/Header/ProfileMenu";
import SimpleBottomNavigation from "../../Components/Header/BottomNav";
import MobileSearchBar from "../../Components/MobileSearchBar";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo/logo-title.jpg";
import { Button } from "react-scroll";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SearchPropertyController from "../../Controllers/PropertyControllers/SearchPropertyController";
import PlaceIcon from "@mui/icons-material/Place";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { facilities } from "../../Assets/data";
import { Rentals } from "../../Components/Cards/Rentals";
import { FaHouseCircleXmark } from "react-icons/fa6";
import { BsFillHouseCheckFill } from "react-icons/bs";

const SearchPropertyPage = () => {
  const { currentUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [properties, setProperties] = useState([]);
  const [foundProperties, setFoundProperties] = useState([]);

  const [open, setOpen] = useState(false);

  const userType = currentUser ? currentUser.userType : null;

  const [selectedTags, setSelectedTags] = useState([]);

  const defaultTags = [
    {
      name: "Available Property",
      icon: <BsFillHouseCheckFill />,
    },
    {
      name: "Sold Property",
      icon: <FaHouseCircleXmark />,
    },
  ];
  // Combine default tags with facilities
  const allFacilities = [...defaultTags, ...facilities];

  const handleTagClick = (tag) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        // If the tag is already selected, remove it from the array
        return prevTags.filter((t) => t !== tag);
      } else {
        // If the tag is not selected, add it to the array
        return [...prevTags, tag];
      }
    });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = async () => {
    console.log("Search for properties with tags: ", selectedTags);
    const searchPropertyController = new SearchPropertyController();
    const foundProperties =
      await searchPropertyController.searchPropertiesByTags(selectedTags);
    setFoundProperties(foundProperties);
  };

  if (foundProperties) {
    console.log("Found properties: ", foundProperties);
  }
  return (
    <div className="App">
      <div className="navbar">
        <div className=" h-[4rem] flex">
          {userType === "buyer" ? (
            <Link to="/buyerHomePage">
              <img
                src={logo}
                alt="logo"
                className="h-[4rem] flex object-cover"
              />
            </Link>
          ) : userType === "seller" ? (
            <Link to="/sellerHomePage">
              <img
                src={logo}
                alt="logo"
                className="h-[4rem] flex object-cover"
              />
            </Link>
          ) : userType === "realEstateAgent" ? (
            <Link to="/realEstateAgentHomePage">
              <img
                src={logo}
                alt="logo"
                className="h-[4rem] flex object-cover"
              />
            </Link>
          ) : (
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="h-[4rem] flex object-cover"
              />
            </Link>
          )}
        </div>
        <div>
          <div className="flex">
            <Button onClick={handleClick}>
              <div className="search-bar w-64 ">
                <div className="search-bar-text">
                  <div className="search-bar-text">
                    <PlaceIcon />
                    {selectedTags.length > 0
                      ? selectedTags.join(", ")
                      : "Any Tags"}
                  </div>
                </div>
              </div>
            </Button>
            <div className="mr-3 flex-shrink-0"> </div>
            <div className="search-bar w-12 items-center justify-center">
              <Button
                onClick={() => {
                  handleSearch(); // Close the menu
                }}
              >
                <SearchRoundedIcon className="search-icon" />
              </Button>
            </div>
          </div>

          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              style: {
                width: "30ch",
              },
            }}
          >
            {allFacilities.map((facility, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  handleTagClick(facility.name);
                }}
                style={{
                  backgroundColor: selectedTags.includes(facility.name)
                    ? "#ddd"
                    : "transparent",
                }}
              >
                <ListItemIcon>{facility.icon}</ListItemIcon>
                <ListItemText>{facility.name}</ListItemText>
              </MenuItem>
            ))}
          </Menu>
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
      <Filter
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      <div className="sm:mx-6 md:mx-10 lg:mx-12 px-3">
        <Rentals properties={foundProperties} />
      </div>
    </div>
  );
};

export default SearchPropertyPage;
