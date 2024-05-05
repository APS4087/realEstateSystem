import { auth } from "../Firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

// UserEntity.js
class UserEntity {
  constructor(db) {
    this.db = db;
  }

  async createUser(userData) {
    try {
      // unwrap the user data
      const {
        email,
        password,
        userType,
        userName,
        phoneNumber,
        profilePicture,
        licenses,
      } = userData;

      const res = await createUserWithEmailAndPassword(auth, email, password);

      console.log(res);

      return 1; // Return the ID of the created user document
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
}

export default UserEntity;
