import React, { useEffect, useState } from "react";

import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";

import Header from "../../../Components/Header";
import CreateUserPic from "../../../Assets/adminPhotos/CreateUser.png";
import ViewUserPic from "../../../Assets/adminPhotos/ViewUser.jpg";
import SearchUserPic from "../../../Assets/adminPhotos/SearchUser.png";
import SuspendUserPic from "../../../Assets/adminPhotos/suspendUser.jpeg";
import UpdateUserPic from "../../../Assets/adminPhotos/UpdateUser.png";

import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import AccountPic from "../../../Assets/adminPhotos/Account.jpg";
import AdminProfile from "../../../Assets/adminPhotos/Profile.png";

const AdminUserAccountPage = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState(0);

  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <div className="w-[17rem] ml-[45rem] text-[20px] font-bold py-9">
        Admin user account page
      </div>
      <div>
        <div className="UserAcctFeat">
          <div className="AcctFeat">
            <Link to="/adminCreateUserAccountPage">
              <img src={CreateUserPic} alt="Create User" />
            </Link>
            <p>Create User Account</p>
          </div>

          <div className="AcctFeat">
            <Link to="/adminViewUserAccountPage">
              <img src={ViewUserPic} alt="View User" />
            </Link>
            <p>View User Account</p>
          </div>

          <div className="AcctFeat">
            <Link to="/adminSearchUserAccountPage">
              <img src={SearchUserPic} alt="Search User" />
            </Link>
            <p>Search User Account</p>
          </div>
        </div>

        <div className="buttons-container">
          <Link to={navigate("/systemAdminHomePage")}>
            <button className="go-back-button">Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminUserAccountPage;
