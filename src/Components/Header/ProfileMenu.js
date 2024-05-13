import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import "./styles.css";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../Backend/Firebase/firebaseConfig";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { currentUser } = useContext(AuthContext);
  const userType = currentUser ? currentUser.userType : null;
  const customProfilePic = currentUser ? currentUser.profilePic : null;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="profile-menu-flex"
      >
        <MenuRoundedIcon />
        {customProfilePic ? (
          <Avatar alt="Profile Picture" src={customProfilePic} />
        ) : (
          <AccountCircleRoundedIcon />
        )}
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          ".MuiPaper-root": {
            minWidth: "200px",
            borderRadius: "1rem",
            boxShadow: "0 1px 2px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 5%)",
          },
        }}
      >
        {currentUser
          ? userType === "buyer"
            ? [
                <MenuItem
                  key="saved"
                  onClick={handleClose}
                  className="menu-items"
                >
                  Saved Properties
                </MenuItem>,
                <Link to={"/boughtPropertiesPage"}>
                  <MenuItem
                    key="bought"
                    onClick={handleClose}
                    className="menu-items"
                  >
                    Bought Properties
                  </MenuItem>
                </Link>,
                <MenuItem
                  key="logout"
                  onClick={handleLogout}
                  className="menu-items"
                >
                  Logout
                </MenuItem>,
              ]
            : userType === "seller"
            ? [
                <MenuItem
                  key="listed"
                  onClick={handleClose}
                  className="menu-items"
                >
                  Listed Properties
                </MenuItem>,
                <Link to={"/createListingPage"}>
                  <MenuItem
                    key="list-your-property"
                    onClick={handleClose}
                    className="menu-items"
                  >
                    List Your Property
                  </MenuItem>
                </Link>,
                <MenuItem
                  key="logout"
                  onClick={handleLogout}
                  className="menu-items"
                >
                  Logout
                </MenuItem>,
              ]
            : userType === "realEstateAgent"
            ? [
                <Link to="/pendingPropertiesPage" className="menu-link">
                  <MenuItem
                    key="pending-properties"
                    onClick={handleClose}
                    className="menu-items"
                  >
                    Pending Properties
                  </MenuItem>
                </Link>,
                <MenuItem
                  key="logout"
                  onClick={handleLogout}
                  className="menu-items"
                >
                  Logout
                </MenuItem>,
              ]
            : null
          : [
              <Link to="/signup" className="menu-link">
                <MenuItem
                  key="signup"
                  className="menu-items"
                  onClick={handleClose}
                >
                  Signup
                </MenuItem>
              </Link>,
              <Link to="/signin" className="menu-link">
                <MenuItem
                  key="login"
                  onClick={handleClose}
                  className="menu-items"
                >
                  Login
                </MenuItem>
              </Link>,
            ]}
      </Menu>
    </div>
  );
}
