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

  async addPendingProperty(realEstateAgentId, propertyData) {
    console.log("In real estate entity", propertyData);
    // Get the selected agent's document
    const agentDoc = await getDoc(
      doc(db, "realEstateAgents", realEstateAgentId)
    );
    const agentData = agentDoc.data();

    // If agentData.pendingProperties is not an array, initialize it as an empty array
    if (!Array.isArray(agentData.pendingProperties)) {
      agentData.pendingProperties = [];
    }

    // Add the listingData to pendingProperties
    agentData.pendingProperties.push(propertyData);

    console.log("Agent data", agentData);
    // Update the agent's document in Firestore
    await updateDoc(doc(db, "realEstateAgents", realEstateAgentId), {
      pendingProperties: agentData.pendingProperties,
    });
  }
}

export default RealEstateAgentEntity;
