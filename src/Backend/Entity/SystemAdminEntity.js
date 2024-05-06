import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";
import UserEntity from "./UserEntity";

class SystemAdminEntity extends UserEntity {
  constructor() {
    super();
  }

  async createUser(userData) {
    try {
      // Create user document in 'users' collection
      const userId = await super.createUser(userData);

      //  Create system admin document in 'systemAdmins' collection
      await setDoc(doc(db, "systemAdmins", userId), {
        uid: userId,
      });

      return userId;
    } catch (error) {
      console.error("Error creating real estate agent:", error);
      throw error;
    }
  }
}

export default SystemAdminEntity;
