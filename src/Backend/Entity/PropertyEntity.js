import {
  addDoc,
  collection,
  setDoc,
  doc,
  getDocs,
  updateDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";

class PropertyEntity {
  constructor() {
    this.collectionRef = collection(db, "properties");
  }

  async create(propertyData) {
    try {
      // Create a new document reference with an auto-generated ID
      const docRef = doc(this.collectionRef);

      // Add the Firestore-generated ID to the property data
      propertyData.id = docRef.id;

      // Create the document with the property data
      await setDoc(docRef, propertyData);

      return docRef.id;
    } catch (error) {
      console.error("Error creating property: ", error);
      throw error;
    }
  }
  async getAllProperties() {
    try {
      const querySnapshot = await getDocs(this.collectionRef);
      return querySnapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.error("Error fetching properties: ", error);
      throw error;
    }
  }
  async markAsSold(propertyId) {
    try {
      const propertyRef = doc(db, "properties", propertyId);
      const propertySnap = await getDoc(propertyRef);

      if (propertySnap.exists()) {
        const propertyData = propertySnap.data();
        const tagIndex = propertyData.tags.indexOf("Available Property");

        if (tagIndex !== -1) {
          // If "Available Property" tag is found, replace it with "Not Available"
          propertyData.tags[tagIndex] = "Not Available";
        } else {
          // If "Available Property" tag is not found, add "Not Available" tag
          propertyData.tags.push("Not Available");
        }

        await updateDoc(propertyRef, propertyData);
      } else {
        console.error("Property does not exist");
      }
    } catch (error) {
      console.error("Error marking property as sold:", error);
      throw error;
    }
  }

  async getProperty(propertyId) {
    try {
      const propertyRef = doc(db, "properties", propertyId);
      const propertySnap = await getDoc(propertyRef);

      if (propertySnap.exists()) {
        return propertySnap.data();
      } else {
        console.error("Property does not exist");
        return null;
      }
    } catch (error) {
      console.error("Error getting property:", error);
      throw error;
    }
  }
  async updateProperty(propertyId, newPropertyData) {
    try {
      // Get a reference to the property document
      const propertyRef = doc(db, "properties", propertyId);

      // Update the property document with the new data
      await updateDoc(propertyRef, newPropertyData);

      console.log("Property updated successfully");
    } catch (error) {
      console.error("Error updating property: ", error);
      throw error;
    }
  }

  async getPropertiesByTags(tags) {
    try {
      let properties = [];

      for (let tag of tags) {
        const q = query(
          this.collectionRef,
          where("tags", "array-contains", tag)
        );
        const querySnapshot = await getDocs(q);

        // Merge the results
        properties = [
          ...properties,
          ...querySnapshot.docs.map((doc) => doc.data()),
        ];
      }

      // Remove duplicates
      properties = properties.filter(
        (property, index, self) =>
          index === self.findIndex((p) => p.id === property.id)
      );

      return properties;
    } catch (error) {
      console.error("Error fetching properties by tags: ", error);
      throw error;
    }
  }
}

export default PropertyEntity;
