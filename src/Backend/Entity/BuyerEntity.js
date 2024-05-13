import {
  addDoc,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";
import UserEntity from "./UserEntity";

class BuyerEntity extends UserEntity {
  constructor() {
    super();
  }

  async createUser(userData) {
    try {
      // Create user document in 'users' collection
      const userId = await super.createUser(userData);

      // Create buyer document in 'buyers' collection
      await setDoc(doc(db, "buyers", userId), {
        uid: userId,
        shortlistedProperties: [],
        purchasedProperties: [], // Initialize purchasedProperties as an empty array
      });

      return userId;
    } catch (error) {
      console.error("Error creating buyer:", error);
      throw error;
    }
  }

  async purchaseProperty(userId, propertyId) {
    try {
      const userRef = doc(db, "buyers", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();

        // Check if purchasedProperties exists, if not, initialize it as an empty array
        if (!userData.purchasedProperties) {
          userData.purchasedProperties = [];
        }

        // Check if the property has already been purchased
        if (userData.purchasedProperties.includes(propertyId)) {
          throw new Error("Property already purchased!");
        }

        userData.purchasedProperties.push(propertyId);

        await updateDoc(userRef, userData);
      } else {
        console.error("User does not exist");
      }
    } catch (error) {
      console.error("Error purchasing property:", error);
      throw error;
    }
  }
  async getBoughtProperties(userId) {
    try {
      const userRef = doc(db, "buyers", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        return userData.purchasedProperties || [];
      } else {
        console.error("User does not exist");
        return [];
      }
    } catch (error) {
      console.error("Error getting bought properties:", error);
      throw error;
    }
  }
  async getShortListedProperties(userId) {
    try {
      const userRef = doc(db, "buyers", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        return userData.shortlistedProperties || [];
      } else {
        console.error("User does not exist");
        return [];
      }
    } catch (error) {
      console.error("Error getting shortListed properties:", error);
      throw error;
    }
  }

  async addToShortlist(userId, propertyId) {
    try {
      const userRef = doc(db, "buyers", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        // Add the propertyId to the shortlistedProperties field
        await updateDoc(userRef, {
          shortlistedProperties: arrayUnion(propertyId),
        });
      } else {
        console.error("User does not exist");
      }
    } catch (error) {
      console.error("Error adding property to shortlist:", error);
      throw error;
    }
  }
  async isShortlisted(userId, propertyId) {
    try {
      const userRef = doc(db, "buyers", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        return userData.shortlistedProperties.includes(propertyId);
      } else {
        console.error("User does not exist");
        return false;
      }
    } catch (error) {
      console.error("Error checking if property is shortlisted:", error);
      return false;
    }
  }
}

export default BuyerEntity;
