import React from "react";

import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
import Header from "../../Components/Header";
import { useState } from "react";
import UpdateUserController from "../../Controllers/UpdateUserController";
import Swal from "sweetalert2";
import avatar from "../../Assets/profile.png";

const UserProfileUpdate = () => {
  const { currentUser } = useContext(AuthContext);

  const updateUserController = new UpdateUserController();

  const [userName, setUsername] = useState(currentUser.username);
  const [newEmail, setNewEmail] = useState("");
  const [currentEmail, setCurrentEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone || "");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== comfirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const formData = {
      userName,
      newEmail,
      currentEmail,
      phone,
      newPassword,
      currentPassword,
    };

    try {
      await updateUserController.updateUser(currentUser.uid, formData);
      Swal.fire({
        title: "Success!",
        text: "Your Profile have been updated!",
        icon: "success",
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="w-[65rem] ml-[30rem] items-center py-10">
        <p className="font-bold text-[30px]">My Profile</p>
      </div>
      <div className="w-[20rem] ml-[35rem] h-[15rem] ">
        <img
          src={currentUser.profilePic || avatar}
          className="h-auto max-w-full"
        />
      </div>
      <form>
        <div className="w-[65rem] ml-[30rem] items-center pt-20">
          <p className="font-semibold text-[23px]">Personal Details</p>
        </div>
        <div className="w-[35rem] ml-[30rem] py-5 pb-7 border-b-2">
          <div className="flex-col flex">
            <p className="py-3 text-[14px]">Full name</p>
            <label>
              <input
                id="Username"
                type="text"
                placeholder={userName}
                onChange={(e) => setUsername(e.target.value)}
                className="py-2 pl-3 pr-60 border rounded-lg outline-0"
              />
            </label>
          </div>
        </div>
        <div className="w-[65rem] ml-[30rem] items-center pt-10">
          <p className="font-semibold text-[23px]">Contact Details</p>
        </div>
        <div className="w-[35rem] ml-[30rem] py-5 pb-7 border-b-2">
          <div className="flex-col flex">
            <p className="py-3 text-[14px]">Phone number</p>
            <label>
              <input
                id="phonenum"
                type="text"
                placeholder={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="py-2 pl-3 pr-60 border rounded-lg outline-0"
              />
            </label>
            <p className="pb-3 pt-6 text-[14px]">Email address</p>
            <label>
              <input
                id="email"
                type="text"
                placeholder={currentUser.email}
                disabled
                className="py-2 pl-3 pr-60 border rounded-lg outline-0"
              />
            </label>
          </div>
        </div>
        <div className="w-[65rem] ml-[30rem] items-center pt-8">
          <p className="font-semibold text-[23px]">Change Password</p>
          <p className="py-3 text-[14px]">Current Password</p>
          <label>
            <input
              id="currentpassword"
              type="text"
              placeholder="Current password"
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="py-2 pl-3 pr-60 border rounded-lg outline-0"
            />
          </label>
          <p className="py-3 text-[14px]">New Password</p>
          <label>
            <input
              id="newpassword1"
              type="text"
              placeholder="New password"
              onChange={(e) => setNewPassword(e.target.value)}
              className="py-2 pl-3 pr-60 border rounded-lg outline-0"
            />
          </label>
          <p className="py-4 text-[14px]">Confirm New Password</p>
          <label>
            <input
              id="newpassword2"
              type="text"
              placeholder="Confirm New password"
              onChange={(e) => setComfirmPassword(e.target.value)}
              className="py-2 pl-3 pr-60 border rounded-lg outline-0"
            />
          </label>
        </div>
        <div className="w-[35rem] ml-[30rem] items-center py-9">
          <button
            type="button"
            onClick={handleSubmit}
            className="py-1 px-5 bg-[#ff5a60] border rounded-full text-white hover:bg-[#f9787c] duration-100 ease-out"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileUpdate;
