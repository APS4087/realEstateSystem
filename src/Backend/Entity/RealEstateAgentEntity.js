import {
  addDoc,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
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
        listedProperties: [],
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

  async getPendingProperties(realEstateAgentId) {
    // Get the selected agent's document
    const agentDoc = await getDoc(
      doc(db, "realEstateAgents", realEstateAgentId)
    );
    const agentData = agentDoc.data();

    // Return the pendingProperties
    return agentData.pendingProperties;
  }

  async getListedProperties(realEstateAgentId) {
    // Get the selected agent's document
    const agentDoc = await getDoc(
      doc(db, "realEstateAgents", realEstateAgentId)
    );
    const agentData = agentDoc.data();

    // Return the pendingProperties
    return agentData.listedProperties;
  }

  async addPropertyToListedProperties(realEstateAgentId, propertyId) {
    try {
      const agentRef = doc(db, "realEstateAgents", realEstateAgentId);

      // Add the property ID to the listedProperties field
      await updateDoc(agentRef, {
        listedProperties: arrayUnion(propertyId),
      });
    } catch (error) {
      console.error("Error adding property to listed properties: ", error);
      throw error;
    }
  }

  async removePropertyFromPendingProperties(realEstateAgentId, propertyId) {
    try {
      const agentRef = doc(db, "realEstateAgents", realEstateAgentId);
      const agentSnap = await getDoc(agentRef);

      if (agentSnap.exists()) {
        const agentData = agentSnap.data();
        const pendingProperties = agentData.pendingProperties || [];

        // Find the index of the property with the matching ID
        const propertyIndex = pendingProperties.findIndex(
          (property) => property.id === propertyId
        );

        if (propertyIndex !== -1) {
          // Remove the property from the array
          pendingProperties.splice(propertyIndex, 1);

          // Update the pendingProperties field with the new array
          await updateDoc(agentRef, { pendingProperties });
        }
      }
    } catch (error) {
      console.error("Error removing property from pending properties: ", error);
      throw error;
    }
  }
  // Method to update property id in pending list
  async updatePropertyId(agentId, oldPropertyId, newPropertyId) {
    try {
      console.log(
        "In update property id",
        agentId,
        oldPropertyId,
        newPropertyId
      );
      const agentRef = doc(db, "realEstateAgents", agentId);
      const agentSnap = await getDoc(agentRef);

      if (agentSnap.exists()) {
        const agentData = agentSnap.data();
        const pendingProperties = agentData.pendingProperties || [];

        // Create a new array with the updated property
        const updatedProperties = pendingProperties.map((property) => {
          if (property.id === oldPropertyId) {
            return { ...property, id: newPropertyId };
          } else {
            return property;
          }
        });

        console.log("Updated pending properties: ", updatedProperties); // Debugging line

        // Update the pendingProperties field with the new array
        await updateDoc(agentRef, { pendingProperties: updatedProperties });
      }
    } catch (error) {
      console.error("Error updating property id: ", error);
      throw error;
    }
  }

  async getAgentDetails(agentId) {
    try {
      // Get the agent's document
      const agentDoc = await getDoc(doc(db, "realEstateAgents", agentId));

      if (agentDoc.exists()) {
        // Return the agent's data
        return agentDoc.data();
      } else {
        console.error("No such agent!");
        return null;
      }
    } catch (error) {
      console.error("Error getting agent details: ", error);
      throw error;
    }
  }

  async getAgentReviews(agentId) {
    try {
      // Get the agent's document

      const agentDoc = await getDoc(doc(db, "realEstateAgents", agentId));

      if (agentDoc.exists()) {
        const agentData = agentDoc.data();

        // Return the agent's reviews data
        console.log("Agent data", agentData.reviewDatas);
        return agentData.reviewDatas;
      } else {
        console.error("No such agent!");
        return null;
      }
    } catch (error) {
      console.error("Error getting agent reviews: ", error);
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
  async addRatingAndReview(agentId, reviewData) {
    try {
      // Get the agent's document
      const agentRef = doc(db, "realEstateAgents", agentId);
      const agentDoc = await getDoc(agentRef);
      const agentData = agentDoc.data();

      // If agentData.reviews is not an array, initialize it as an empty array
      if (!Array.isArray(agentData.reviewDatas)) {
        agentData.reviewDatas = [];
      }

      // Add the review data to the reviews array
      agentData.reviewDatas.push(reviewData);

      // Update the agent's document in the database with the new review data
      await updateDoc(agentRef, { reviewDatas: agentData.reviewDatas });

      return true;
    } catch (error) {
      console.error("Error adding review: ", error);
      return false;
    }
  }
}

export default RealEstateAgentEntity;
