import { addDoc, collection, doc, setDoc } from "firebase/firestore";
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
      });

      return userId;
    } catch (error) {
      console.error("Error creating buyer:", error);
      throw error;
    }
  }
}

export default BuyerEntity;
