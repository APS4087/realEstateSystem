import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";
import UserEntity from "./UserEntity";

class RealEstateAgentEntity extends UserEntity {
  constructor() {
    super();
  }

  async createUser(userData) {
    try {
      // Create user document in 'users' collection
      const userId = await super.createUser(userData);
      // Get the license number from userData
      const { license } = userData;
      //  Create real estate agent document in 'realEstateAgents' collection
      await setDoc(doc(db, "realEstateAgents", userId), {
        uid: userId,
        license: license,
        shortlistedProperties: [],
        pendingProperties: [],
      });

      return userId;
    } catch (error) {
      console.error("Error creating real estate agent:", error);
      throw error;
    }
  }
}

export default RealEstateAgentEntity;
