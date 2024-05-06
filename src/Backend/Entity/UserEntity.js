import { auth, db } from "../Firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

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
        profilePic,
        licenses,
      } = userData;

      // for firebase authentication
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("profilePicture: ", profilePic);

      // save the user data to the firestore
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        email: email,
        userName: userName,
        profilePicture: profilePic,
      });

      return res.user.uid; // Return the ID of the created user document
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
}

export default UserEntity;
