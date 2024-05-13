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

class SellerEntity extends UserEntity {
  constructor() {
    super();
  }

  async createUser(userData) {
    try {
      // Create user document in 'users' collection
      const userId = await super.createUser(userData);

      // Create seller document in 'sellers' collection
      await setDoc(doc(db, "sellers", userId), {
        uid: userId,
        listedProperties: [],
      });

      return userId;
    } catch (error) {
      console.error("Error creating seller: ", error);
      throw error;
    }
  }

  // Method to fetch seller data by id
  async getSellerData(sellerId) {
    try {
      const sellerDoc = await getDoc(doc(db, "sellers", sellerId));
      if (sellerDoc.exists()) {
        return sellerDoc.data();
      } else {
        throw new Error("No such seller!");
      }
    } catch (error) {
      console.error("Error fetching seller data: ", error);
      throw error;
    }
  }

  async addPropertyToListedProperties(sellerId, propertyId) {
    try {
      const sellerRef = doc(db, "sellers", sellerId);

      // Add the property ID to the listedProperties field
      await updateDoc(sellerRef, {
        listedProperties: arrayUnion(propertyId),
      });
      console.log(
        "Property ID added to listed properties for seller: ",
        propertyId
      );
    } catch (error) {
      console.error("Error adding property to listed properties: ", error);
      throw error;
    }
  }
  async getListedProperties(sellerId) {
    // Get the selected agent's document
    const sellerDoc = await getDoc(doc(db, "sellers", sellerId));
    const sellerData = sellerDoc.data();

    // Return the pendingProperties
    return sellerData.listedProperties;
  }

  async soldProperty(userId, propertyId) {
    try {
      const userRef = doc(db, "sellers", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();

        // Check if purchasedProperties exists, if not, initialize it as an empty array
        if (!userData.soldProperties) {
          userData.soldProperties = [];
        }

        userData.soldProperties.push(propertyId);

        await updateDoc(userRef, userData);
        console.log("Property has been added to sold properties: ", propertyId);
      } else {
        console.error("User does not exist");
      }
    } catch (error) {
      console.error("Error purchasing property:", error);
      throw error;
    }
  }
  async getSoldProperties(sellerId) {
    // Get the selected agent's document
    const sellerDoc = await getDoc(doc(db, "sellers", sellerId));
    const sellerData = sellerDoc.data();

    // Return the pendingProperties
    return sellerData.soldProperties;
  }
}

export default SellerEntity;
