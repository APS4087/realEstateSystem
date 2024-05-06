import { addDoc, collection, doc, setDoc } from "firebase/firestore";
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
}

export default SellerEntity;
