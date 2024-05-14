import React, { useEffect, useState } from "react";

//import "../../../Styles/adminCreateUserAccount.css";
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

const CreateUserAccountPage = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState(0);

  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [license, setLicense] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lakukan logika untuk mengirim data ke server
    // Anda dapat menggunakan axios atau fetch untuk mengirim data ke endpoint CreateAcctController.php
  };

  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <div className="ml-[43rem] text-[20px] font-bold py-8">Admin user account CREATE page</div>
      <div className="">
        <h2 className="pb-5">Create User Account</h2>
        <form onSubmit={handleSubmit}>
          <div className=" ml-[30rem]">
            <label className="ml-[0.5rem]">Choose role:</label>
            <div className="py-5">
              <select
                id=""
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="w-[50rem] rounded-full"
              >
                <option value="">Select Role</option>
                <option value="system_admin">System Admin</option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="property_agent">Property Agent</option>
              </select>
            </div>
          </div>
          <div className=" ml-[30rem]">
            <label className="ml-[0.5rem]">Input username:</label>
            <div className="py-5">
              <input
              id=""
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-[50rem] border border-gray-900 py-2 px-3 rounded-full"
            />
            </div>
            
          </div>
          <div className=" ml-[30rem]">
            <label className="ml-[0.5rem]">Input password:</label>
            <div className="py-5">
              <input
              id=""
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-[50rem] rounded-full"
            />
            </div>
            
          </div>
          <div className=" ml-[30rem]">
            <label className="ml-[0.5rem]">Input license id:</label>
            <div className="py-5">
              <input
              id=""
              type="license"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              className="w-[50rem] border border-gray-900 py-2 px-3 rounded-full"
            />
            </div>
            
          </div>
          <div className=" ml-[30rem]">
            <label className="ml-[0.5rem]">Email:</label>
            <div className="py-5">
              <input
              id=""
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-[50rem] rounded-full"
            />
            </div>
            
          </div>
          <div className="button-container">
            <button className="createButton" type="submit">
              Create
            </button>
            <Link to={"/adminUserAccountPage"}>
              <button className="go-back-button">Back</button>
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
};

export default CreateUserAccountPage;
