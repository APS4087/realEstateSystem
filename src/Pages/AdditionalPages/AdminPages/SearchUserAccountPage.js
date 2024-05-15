import React, { useEffect, useState } from "react";

import "../../../Styles/adminSearchUserAccount.css";
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

const SearchUserAccountPage = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState(0);

  const [searchResults, setSearchResults] = useState([]);
  const [searchID, setSearchID] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Mocking search results using dummy data
    const dummyData = [
      { id: 1, name: "John Doe", role: "Admin", email: "john.doe@example.com" },
      {
        id: 2,
        name: "Jane Smith",
        role: "User",
        email: "jane.smith@example.com",
      },
      // Add more dummy data as needed
    ];
    // Filtering dummy data based on search criteria
    const filteredData = dummyData.filter(
      (user) =>
        (!searchID || user.id.toString().includes(searchID)) &&
        (!searchName ||
          user.name.toLowerCase().includes(searchName.toLowerCase())) &&
        (!searchRole ||
          user.role.toLowerCase().includes(searchRole.toLowerCase())) &&
        (!searchEmail ||
          user.email.toLowerCase().includes(searchEmail.toLowerCase()))
    );
    setSearchResults(filteredData);
  };

  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <div className="ml-[44rem] text-[20px] font-bold py-8">Admin user account Search page</div>
      <div>
        <h2>Search Users</h2>
        <div className="w-[100rem] ml-[15rem] py-10">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-5 items-center">
              <label>ID:</label>
              <input
                type="text"
                value={searchID}
                onChange={(e) => setSearchID(e.target.value)}
                className='rounded-xl'
              />
              <label>Name:</label>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className='rounded-xl'
              />
              <label>Role:</label>
              <input
                type="text"
                value={searchRole}
                onChange={(e) => setSearchRole(e.target.value)}
                className='rounded-xl'
              />
              <label>Email:</label>
              <input
                type="text"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                className='rounded-xl'
              />
              <button className="px-3 py-2 border border-gray-900 rounded-full bg-green-500 text-[20px] text-white hover:bg-green-700" type="submit">
                Search
              </button>
            </div>

          </form>
        </div>

        <div className="displayResult w-[100rem] ml-[4rem]">
          {searchResults.length > 0 ? (
            <div className="searchResults">
              <table>
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.role}</td>
                      <td>{user.email}</td>
                      <td>
                        <Link to="/updateAccount">
                          <button className="px-3 py-2 border border-gray-900 rounded-full bg-blue-500 text-[15px] text-white hover:bg-blue-700">Update</button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>No results found.</div>
          )}
        </div>

        <div className="button-container pt-5">
          <Link to={"/adminUserAccountPage"}>
            <button className="go-back-button">Back</button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SearchUserAccountPage;