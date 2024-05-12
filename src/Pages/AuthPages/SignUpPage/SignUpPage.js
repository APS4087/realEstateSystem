import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import avatar from "../../../Assets/profile.png";
import styles from "../../../Styles/AuthStyle.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

import SignUpController from "../../../Controllers/AuthControllers/SignUpController";

function SignUpPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const resizeWidth = 300; // Width for resizing the image
  const resizeHeight = 300; // Height for resizing the image

  const signUpController = new SignUpController();

  const formik = useFormik({
    initialValues: {
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
      userType: "",
      license: "",
    },
    validate: signUpController.registerValidation.bind(signUpController), // Bind the method to the instance
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      values = { ...values, profilePic: file || "" }; // send cropped image to the server

      try {
        const response = await signUpController.registerUser(values);

        toast.promise(Promise.resolve(response), {
          loading: <b>Creating...</b>,
          success: <b>Register Successfully...!</b>,
          error: <b>Could not Register.</b>,
        });

        const userType = values.userType;
        handleUserTypeNavigation(userType);
      } catch (error) {
        console.error("Error during registration:", error);
        toast.error("Could not register. Please try again.");
      }
    },
  });

  // function to navigate to the respective dashboard based on the user type
  const handleUserTypeNavigation = (userType) => {
    const routes = {
      Admin: "/systemAdminHomePage",
      realEstateAgent: "/realEstateAgentHomePage",
      seller: "/sellerHomePage",
      buyer: "/buyerHomePage",
    };

    if (userType && routes[userType]) {
      navigate(routes[userType]);
    } else {
      console.error("User type not found in the response");
    }
  };

  // function to handle the image upload
  const onUpload = async (e) => {
    const selectedFile = e.target.files[0];

    // Resize the image
    const resizedImageBase64 = await resizeImage(selectedFile);
    setFile(resizedImageBase64);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = resizeWidth;
          canvas.height = resizeHeight;
          ctx.drawImage(img, 0, 0, resizeWidth, resizeHeight);
          resolve(canvas.toDataURL("image/jpeg"));
        };
      };
    });
  };
  return (
    <div className={styles.signPage}>
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="flex justify-center items-center h-screen">
          <div className={styles.glass} style={{ width: "30%" }}>
            <div className="title flex flex-col items-center">
              <h4 className="py-1 text-5xl font-bold">Sign Up Now !</h4>
            </div>

            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="profile flex justify-center py-4">
                <label htmlFor="profilePic">
                  <img
                    src={preview || avatar} // Display preview of the selected file
                    className={styles.profile_img}
                    alt="Avatar pic"
                  />
                </label>
                <input
                  onChange={onUpload}
                  type="file"
                  id="profilePic"
                  name="profilePic"
                />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                <div className="name flex w-3/4 gap-7">
                  <input
                    {...formik.getFieldProps("userName")}
                    className={styles.textbox}
                    type="text"
                    placeholder="Username*"
                  />
                  <input
                    {...formik.getFieldProps("email")}
                    className={styles.textbox}
                    type="text"
                    placeholder="Email*"
                  />
                </div>

                <div className="name flex w-3/4 gap-7">
                  <input
                    {...formik.getFieldProps("password")}
                    className={styles.textbox}
                    type="password"
                    placeholder="Password*"
                  />
                  <input
                    {...formik.getFieldProps("confirmPassword")}
                    className={styles.textbox}
                    type="password"
                    placeholder="Confirm Password*"
                  />
                </div>

                <select
                  {...formik.getFieldProps("userType")}
                  className={styles.textbox}
                >
                  <option value="">Select User Type</option>
                  <option value="realEstateAgent">Real Estate Agent</option>
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </select>

                {/* Additional field for real estate agents */}
                {formik.values.userType === "realEstateAgent" && (
                  <input
                    {...formik.getFieldProps("license")}
                    className={styles.textbox}
                    type="text"
                    placeholder="Licenses*"
                  />
                )}

                <button className={styles.btn} type="submit">
                  Sign Up
                </button>
              </div>

              <div className="text-center py-4">
                <span className="text-gray-500">
                  Already registered?{" "}
                  <Link className="text-red-500" to="/signin">
                    Login
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
