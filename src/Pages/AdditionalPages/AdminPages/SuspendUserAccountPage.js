import React, { useEffect, useState } from "react";

//import "../../../Styles/adminSuspendUserAccount.css";
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

const SuspendUserAccountPage = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [selectedUser, setSelectedUser] = useState("");

  // Function to handle suspend user
  const handleSuspendUser = () => {
    if (!selectedUser) {
      alert("Please select a user to suspend");
      return;
    }
    // Lakukan logika untuk menangguhkan pengguna dengan selectedUser
    // Misalnya: fetch(`suspendUserEndpoint/${selectedUser}`, { method: 'POST' });
    alert(`User ${selectedUser} suspended successfully`);
  };

  // Function to handle select user
  const handleSelectUser = (event) => {
    setSelectedUser(event.target.value);
  };

  return (
    <div className="App">
      <div>
        <Header />
      </div>

      <div>Admin user account SUSPEND page</div>
      <div className="box">
        <h2>User Suspension</h2>
        <div>
          <label>Select user to suspend:</label>
          <select value={selectedUser} onChange={handleSelectUser} required>
            <option value="">Select User</option>
            <option value="user1">User 1</option>
            <option value="user2">User 2</option>
            {/* Tambahkan opsi pengguna lainnya di sini */}
          </select>
        </div>
        <div className="button-container">
          <button onClick={handleSuspendUser} className="suspend-button">
            Suspend User
          </button>
          <Link to={"/systemAdminHomePage"}>
            <button className="back-button">Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuspendUserAccountPage;
