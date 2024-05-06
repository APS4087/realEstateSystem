import React from "react";
import LogoutBtn from "../../Utils/logoutBtn";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import avatar from "../../Assets/profile.png";
import { Avatar } from "@mui/material";

const BuyerHomePage = () => {
  const { currentUser } = useContext(AuthContext);
  const customProfilePic = currentUser ? currentUser.profilePic : null;
  console.log(currentUser);
  return (
    <>
      <div>BuyerHomePage</div>
      <div>Welcome, {currentUser ? currentUser.username : ""}</div>
      {customProfilePic ? (
        <Avatar alt="Profile Picture" src={customProfilePic} />
      ) : (
        <Avatar alt="Profile Picture" src={avatar} />
      )}
      <div></div>
      <div>
        <LogoutBtn />
      </div>
    </>
  );
};

export default BuyerHomePage;
