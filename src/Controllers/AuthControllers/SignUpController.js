import { db } from "../../Backend/Firebase/firebaseConfig";
import UserEntity from "../../Backend/Entity/UserEntity";
import toast from "react-hot-toast";
import { getDocs, query, collection, where } from "firebase/firestore";
import BuyerEntity from "../../Backend/Entity/BuyerEntity";
import SellerEntity from "../../Backend/Entity/SellerEntity";
import RealEstateAgentEntity from "../../Backend/Entity/RealEstateAgentEntity";
import SystemAdminEntity from "../../Backend/Entity/SystemAdminEntity";

class SignUpController {
  constructor() {
    this.buyerEntity = new BuyerEntity();
    this.sellerEntity = new SellerEntity();
    this.realEstateAgentEntity = new RealEstateAgentEntity();
    this.systemAdminEntity = new SystemAdminEntity();
  }

  async registerUser(userData) {
    try {
      const userType = userData.userType;

      if (userType === "buyer") {
        await this.buyerEntity.createUser(userData);
      } else if (userType === "seller") {
        await this.sellerEntity.createUser(userData);
      } else if (userType === "realEstateAgent") {
        await this.realEstateAgentEntity.createUser(userData);
      } else if (userType === "Admin") {
        await this.systemAdminEntity.createUser(userData);
      } else {
        throw new Error("Invalid user type");
      }

      return Promise.resolve("Successfully registered user"); // Return a success message
    } catch (error) {
      console.error("Error registering user:", error);
      return Promise.reject({
        error: "Could not register user. Please try again.",
      });
    }
  }

  async usernameVerify(error = {}, values) {
    if (!values.userName) {
      error.userName = toast.error("Username Required...!");
    } else if (values.userName.includes(" ")) {
      error.userName = toast.error("Invalid Username...!");
    }

    return error;
  }

  async passwordVerify(errors = {}, values) {
    /* eslint-disable no-useless-escape */
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!values.password) {
      errors.password = toast.error("Password Required...!");
    } else if (values.password.includes(" ")) {
      errors.password = toast.error("Wrong Password...!");
    } else if (values.password.length < 4) {
      errors.password = toast.error(
        "Password must be more than 4 characters long"
      );
    } else if (!specialChars.test(values.password)) {
      errors.password = toast.error("Password must have special character");
    }

    return errors;
  }

  async emailVerify(error = {}, values) {
    if (!values.email) {
      error.email = toast.error("Email Required...!");
    } else if (values.email.includes(" ")) {
      error.email = toast.error("Wrong Email...!");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      error.email = toast.error("Invalid email address...!");
    }

    return error;
  }

  async checkIfUserExists(userName) {
    try {
      // Implement logic to check if user exists
      // For example, query the database to check if the userName already exists
      // Here's a mock implementation assuming you have a users collection in Firestore
      const userQuerySnapshot = await getDocs(
        query(collection(db, "users"), where("userName", "==", userName))
      );

      return !userQuerySnapshot.empty; // Return true if user exists, false otherwise
    } catch (error) {
      console.error("Error checking if user exists:", error);
      throw new Error("Could not check if user exists. Please try again.");
    }
  }

  async checkIfEmailExists(email) {
    try {
      // Implement logic to check if email exists
      // For example, query the database to check if the email already exists
      // Here's a mock implementation assuming you have a users collection in Firestore
      const emailQuerySnapshot = await getDocs(
        query(collection(db, "users"), where("email", "==", email))
      );

      return !emailQuerySnapshot.empty; // Return true if email exists, false otherwise
    } catch (error) {
      console.error("Error checking if email exists:", error);
      throw new Error("Could not check if email exists. Please try again.");
    }
  }

  async registerValidation(values) {
    const errors = await this.usernameVerify({}, values); // Await the asynchronous method
    // check if username already exists
    const userExists = await this.checkIfUserExists(values.userName); // Await the asynchronous method
    if (userExists) {
      errors.userName = toast.error("Username already exists...!");
    }

    const error = await this.passwordVerify(errors, values); // Await the asynchronous method
    if (values.password !== values.confirmPassword) {
      error.exist = toast.error("Passwords do not match...!");
    }

    const emailExists = await this.checkIfEmailExists(values.email); // Await the asynchronous method
    if (emailExists) {
      errors.email = toast.error("Email already exists...!");
    }

    await this.emailVerify(errors, values); // Await the asynchronous method

    return errors;
  }
}

export default SignUpController;
