import React, { useEffect, useState } from "react";

import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";

import Header from "../../../Components/Header";
import CreateUserPic from "../../../Assets/adminPhotos/CreateUser.png";
import ViewUserPic from "../../../Assets/adminPhotos/ViewUser.jpg";
import SearchUserPic from "../../../Assets/adminPhotos/SearchUser.png";
import SuspendUserPic from "../../../Assets/adminPhotos/suspendUser.jpeg";
import UpdateUserPic from "../../../Assets/adminPhotos/UpdateUser.png";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import AccountPic from "../../../Assets/adminPhotos/Account.jpg";
import AdminProfile from "../../../Assets/adminPhotos/Profile.png";
import { Create } from "@mui/icons-material";
import TheCreatorController from "../../../Controllers/TheCreatorController/TheCreatorController";

const CreateUserProfilePage = () => {
  const { currentUser } = useContext(AuthContext);
  const [newProfile, setNewProfile] = useState("");
  const [currentUserProfiles, setCurrentUserProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const creatorController = new TheCreatorController();
      const profiles = await creatorController.fetchUserProfiles();
      setCurrentUserProfiles(profiles);
    };

    fetchProfiles();
  }, []);

  const handleClick = async (event) => {
    event.preventDefault();

    try {
      const creatorController = new TheCreatorController();
      await creatorController.createCollection(newProfile);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile created successfully",
      });
    } catch (error) {
      console.error("Error creating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create profile",
      });
    }
  };
  console.log(currentUserProfiles);

  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <div class="mt-20">
        <h2 className="text-center text-4xl text-gray-800 mb-5">
          Create New User Profile
        </h2>
        <form class="max-w-sm mx-auto">
          <div class="mb-5">
            <label
              for="userProfile"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter the name of the new Profile to add
            </label>
            <input
              type="text"
              id="userProfile"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=" "
              required
              onChange={(e) => setNewProfile(e.target.value)}
            />
          </div>

          <button
            onClick={handleClick}
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create Profile
          </button>
        </form>
      </div>
      <div className="ml-10 mr-5">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="p-4">
                  <div class="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-all-search" class="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3">
                  Current User Profiles
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUserProfiles &&
                currentUserProfiles.map((userProfile, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id={`checkbox-table-search-${index}`}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor={`checkbox-table-search-${index}`}
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td className="px-6 py-4">{userProfile.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateUserProfilePage;
