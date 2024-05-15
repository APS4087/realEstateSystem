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

      <div className="ml-[44rem] text-[20px] font-bold py-8">
        Admin user account SUSPEND page
      </div>
      <div className="box">
        <h2 className="pb-7">User Suspension</h2>
        <div className="ml-[43rem] pb-7">
          <label className="pr-7">Select user to suspend:</label>
          <select
            value={selectedUser}
            onChange={handleSelectUser}
            required
            className="rounded-full px-10"
          >
            <option value="">Select User</option>
            <option value="user1">User 1</option>
            <option value="user2">User 2</option>
            {/* Tambahkan opsi pengguna lainnya di sini */}
          </select>
        </div>

        <div className="ml-[47rem] gap-7 flex py-10">
          <button
            onClick={handleSuspendUser}
            className="px-4 py-2 border border-gray-900 rounded-full bg-green-500 text-[20px] text-white hover:bg-green-700"
          >
            Suspend
          </button>
          <Link to={"/adminUserAccountPage"}>
            <button className="px-4 py-2 border border-gray-900 rounded-full bg-red-500 text-[20px] text-white hover:bg-red-700">
              Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuspendUserAccountPage;
