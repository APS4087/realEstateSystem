import { auth, db } from "../Firebase/firebaseConfig";
import { reauthenticateWithCredential } from "firebase/auth";
import { EmailAuthProvider, getAuth } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  updatePassword,
  updateEmail,
} from "firebase/auth";

import {
  addDoc,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Phone } from "@mui/icons-material";

// UserEntity.js
class UserEntity {
  constructor() {}

  async createUser(userData) {
    try {
      // unwrap the user data
      const {
        email,
        password,
        userType,
        userName,
        profilePic,
        licenses,
        phone,
      } = userData;

      // for firebase authentication
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // save the user data to the firestore
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        email: email,
        userName: userName,
        profilePicture: profilePic,
        userType: userType,
        phone: phone || null,
        isSuspended: false,
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

      const user = userCredential.user;
      // Return user information if needed
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();

            return {
              ...user,
              username: userData.userName,
              profilePic: userData.profilePicture,
              userType: userData.userType,
              isSuspended: userData.isSuspended,
            };
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      return userCredential.user;
    } catch (error) {
      console.error("Error signing in user:", error);
      throw error;
    }
  }

  // Method to fetch user data by id
  async getUserData(userId) {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        throw new Error("No such user!");
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
      throw error;
    }
  }

  async updateUser(userId, userData) {
    try {
      // Get a reference to the user document
      console.log(userData);
      const userDocRef = doc(db, "users", userId);

      const updateData = {
        userName: userData.userName,
        phone: userData.phone,
      };

      // Update the user document
      await updateDoc(userDocRef, updateData);

      // Get the current user
      const auth = getAuth();
      const user = auth.currentUser;

      // Reauthenticate the user before updating email or password
      if (userData.currentEmail || userData.currentPassword) {
        const credential = EmailAuthProvider.credential(
          userData.currentEmail,
          userData.currentPassword // The current password entered by the user
        );
        await reauthenticateWithCredential(user, credential);
      }

      // Check if the email needs to be updated
      if (userData.newEmail) {
        await updateEmail(user, userData.newEmail);
        await updateDoc(userDocRef, { email: userData.newEmail });
      }

      // Check if the password needs to be updated
      if (userData.newPassword) {
        await updatePassword(user, userData.newPassword);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
  async updateOtherUserDetails(userId, newDetails) {
    try {
      // Get a reference to the user document
      const userDocRef = doc(db, "users", userId);

      // Update the user document
      await updateDoc(userDocRef, newDetails);
    } catch (error) {
      console.error("Error updating user details:", error);
      throw error;
    }
  }
  async getAllUsers() {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      return querySnapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw error;
    }
  }
  async suspendUser(userId) {
    try {
      // Get a reference to the user document
      const userDocRef = doc(db, "users", userId);

      // Update the isSuspended field to true, or create it if it doesn't exist
      await setDoc(userDocRef, { isSuspended: true }, { merge: true });
    } catch (error) {
      console.error("Error suspending user:", error);
      throw error;
    }
  }

  async reactivateUser(userId) {
    try {
      // Get a reference to the user document
      const userDocRef = doc(db, "users", userId);

      // Update the isSuspended field to false
      await setDoc(userDocRef, { isSuspended: false }, { merge: true });
    } catch (error) {
      console.error("Error reactivating user:", error);
      throw error;
    }
  }
}

export default UserEntity;
