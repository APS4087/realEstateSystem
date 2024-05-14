import React, { useEffect, useState } from "react";

import "../../../Styles/adminCreateUserAccount.css";
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
      <div>Admin user account CREATE page</div>
      <div className="form-container">
        <h2>Create User Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-create">
            <label>Choose role:</label>
            <select
              id="form"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="system_admin">System Admin</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="property_agent">Property Agent</option>
            </select>
          </div>
          <div className="form-create">
            <label>Input username:</label>
            <input
              id="form"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-create">
            <label>Input password:</label>
            <input
              id="form"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-create">
            <label>Input license id:</label>
            <input
              id="form"
              type="license"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
            />
          </div>
          <div className="form-create">
            <label>Email:</label>
            <input
              id="form"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="button-container">
            <button className="createButton" type="submit">
              Create
            </button>
          </div>
        </form>

        <div className="button-container">
          <form method="post" name="logout">
            <button className="logOutButton" name="logout">
              Logout
            </button>
          </form>
          <Link to={"/userAccount"}>
            <button className="go-back-button">Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateUserAccountPage;
