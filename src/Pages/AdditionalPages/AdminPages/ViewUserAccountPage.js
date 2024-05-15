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
      <div className="ml-[44rem] text-[20px] font-bold py-8">Admin user account VIEW page</div>
      <div>
        <h2 className="pb-7">User Account List</h2>
        <div className="ml-[24rem]">
          <table className="border border-gray-900">
            <thead className="border border-gray-900">
              <tr className="">
                <th className="border border-gray-900 px-4">User ID</th>
                <th className="border border-gray-900">Name</th>
                <th className="border border-gray-900">Email</th>
                <th className="border border-gray-900 px-4">License ID</th>
                <th className="border border-gray-900 px-4">Phone Number</th>
                <th className="border border-gray-900">Role</th>
                <th className="border border-gray-900">Status</th>
              </tr>
            </thead>
            <tbody >
              {userAccounts.map((userAcct, index) => (
                <tr key={index} className="border border-gray-900 justify-center">
                  <td className="border border-gray-900 py-2 px-10">{userAcct.User_ID}</td>
                  <td className="border border-gray-900 py-2 px-3">{userAcct.Name}</td>
                  <td className="border border-gray-900 py-2 px-3">{userAcct.Email}</td>
                  <td className="border border-gray-900 py-2 px-3">{userAcct.License_ID}</td>
                  <td className="border border-gray-900 py-2 px-3">{userAcct.Phone_Number}</td>
                  <td className="border border-gray-900 py-2 px-3">{userAcct.Role}</td>
                  <td className="border border-gray-900 py-2 px-3">{userAcct.Status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="ml-[51rem] pt-10">
          <Link to={"/adminUserAccountPage"}>
            <button className="px-3 py-2 border border-gray-900 rounded-full bg-red-500 text-[20px] text-white hover:bg-red-700">Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewUserAccountPage;
