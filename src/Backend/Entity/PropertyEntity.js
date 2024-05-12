import { addDoc, collection, setDoc, doc, getDocs } from "firebase/firestore";
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
}

export default PropertyEntity;
