import React from "react";
import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Backend/Firebase/firebaseConfig";

const LogoutBtn = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <div>
      <IconButton aria-label="logout" onClick={handleLogout}>
        <LogoutIcon />
      </IconButton>
    </div>
  );
};

export default LogoutBtn;
