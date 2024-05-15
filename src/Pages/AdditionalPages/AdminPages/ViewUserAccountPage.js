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
import { Create } from "@mui/icons-material";

const ViewUserAccountPage = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState(0);

  const [userAccounts, setUserAccounts] = useState([
    {
      User_ID: "1",
      Name: "John Doe",
      Email: "john@example.com",
      License_ID: "LIC123",
      Phone_Number: "123-456-7890",
      Status: "Active",
      Role: "System Admin",
      img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
    },
    {
      User_ID: "2",
      Name: "Jane Smith",
      Email: "jane@example.com",
      License_ID: "LIC456",
      Phone_Number: "987-654-3210",
      Status: "Suspended",
      Role: "Real Estate Agent",
      img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
    },
    {
      User_ID: "3",
      Name: "Michael Johnson",
      Email: "michael@example.com",
      License_ID: "LIC789",
      Phone_Number: "555-123-4567",
      Status: "Active",
      Role: "Seller",
      img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
    },
    {
      User_ID: "4",
      Name: "Emily Brown",
      Email: "emily@example.com",
      License_ID: "LIC321",
      Phone_Number: "444-567-8901",
      Status: "Active",
      Role: "Buyer",
      img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
    },
  ]);

  const TABLE_HEAD = [
    "User ID",
    "Name",
    "Email",
    "License ID",
    "Phone Number",
    "UserTy",
    "Status",
  ];
  const handleLogout = (event) => {
    console.log("Logging out...");
  };

  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <div>Admin user account VIEW page</div>
      <div>
        <h2>User Account List</h2>
        <div className="displayAcctResult">
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>License ID</th>
                <th>Phone Number</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {userAccounts.map((userAcct, index) => (
                <tr key={index}>
                  <td>{userAcct.User_ID}</td>
                  <td>{userAcct.Name}</td>
                  <td>{userAcct.Email}</td>
                  <td>{userAcct.License_ID}</td>
                  <td>{userAcct.Phone_Number}</td>
                  <td>{userAcct.Role}</td>
                  <td>{userAcct.Status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="buttons-container">
          <form method="post" name="logout" onSubmit={handleLogout}>
            <button className="logOutButtonView" type="submit" name="logout">
              Logout
            </button>
          </form>
          <Link to={"/systemAdminHomePage"}>
            <button className="back-button-view">Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewUserAccountPage;
