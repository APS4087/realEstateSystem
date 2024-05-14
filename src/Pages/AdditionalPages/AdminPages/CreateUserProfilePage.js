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

const CreateUserProfilePage = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState(0);

  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [license, setLicense] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  const [error, setError] = useState("");

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

      <form onSubmit={handleSubmit} className="user-profile-form">
        {error && <div className="error-message">{error}</div>}

        <label>Enter new user profile here!:</label>
        <input
          type="text"
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
        />

        <button type="submit">Create User Profile</button>
      </form>
    </div>
  );
};

export default CreateUserProfilePage;
