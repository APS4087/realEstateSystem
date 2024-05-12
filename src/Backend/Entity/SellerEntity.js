import {
  addDoc,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
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
}

export default SellerEntity;
