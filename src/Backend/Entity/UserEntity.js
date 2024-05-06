import { auth, db } from "../Firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

// UserEntity.js
class UserEntity {
  constructor() {}

  async createUser(userData) {
    try {
      // unwrap the user data
      const { email, password, userType, userName, profilePic, licenses } =
        userData;

      // for firebase authentication
      const res = await createUserWithEmailAndPassword(auth, email, password);

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

  async signInUser(email, password) {
    try {
      // Sign in the user with email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Return user information if needed
      return userCredential.user;
    } catch (error) {
      console.error("Error signing in user:", error);
      throw error;
    }
  }
}

export default UserEntity;
