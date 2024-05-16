import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";

class MetaDataEntity {
  async createCollection(profileName) {
    try {
      // Create a new collection reference
      const collectionRef = collection(db, profileName);

      // Create a new document in the collection
      const docRef = doc(collectionRef);

      // Set the document with an empty object
      await setDoc(docRef, {});

      // Update the collections document
      const collectionsDocRef = doc(db, "metadata", "collections");
      const collectionsDoc = await getDoc(collectionsDocRef);

      const userProfile = {
        name: profileName,
        isSuspended: false,
      };

      if (collectionsDoc.exists()) {
        // If the document exists, update it
        const userProfiles = collectionsDoc.data().userProfiles || [];
        await updateDoc(collectionsDocRef, {
          userProfiles: [...userProfiles, userProfile],
        });
      } else {
        // If the document does not exist, create it
        // Add the current user profiles
        const userProfiles = [
          { name: "buyers", isSuspended: false },
          { name: "sellers", isSuspended: false },
          { name: "real estate agent", isSuspended: false },
          { name: "system admin", isSuspended: false },
          { name: "lawyers", isSuspended: false },
        ];
        await setDoc(collectionsDocRef, {
          userProfiles: [...userProfiles, userProfile],
        });
      }

      console.log("Collection created with name: ", profileName);
    } catch (error) {
      console.error("Error creating collection: ", error);
      throw error;
    }
  }
  async suspendUser(profileName) {
    const collectionsDocRef = doc(db, "metadata", "collections");
    const collectionsDoc = await getDoc(collectionsDocRef);

    if (collectionsDoc.exists()) {
      let userProfiles = collectionsDoc.data().userProfiles;
      userProfiles = userProfiles.map((profile) =>
        profile.name === profileName
          ? { ...profile, isSuspended: true }
          : profile
      );

      await updateDoc(collectionsDocRef, { userProfiles });
    }
  }

  async reactivateUser(profileName) {
    const collectionsDocRef = doc(db, "metadata", "collections");
    const collectionsDoc = await getDoc(collectionsDocRef);

    if (collectionsDoc.exists()) {
      let userProfiles = collectionsDoc.data().userProfiles;
      userProfiles = userProfiles.map((profile) =>
        profile.name === profileName
          ? { ...profile, isSuspended: false }
          : profile
      );

      await updateDoc(collectionsDocRef, { userProfiles });
    }
  }
  async fetchUserProfiles() {
    try {
      // Get the collections document
      const collectionsDocRef = doc(db, "metadata", "collections");
      const collectionsDoc = await getDoc(collectionsDocRef);

      if (collectionsDoc.exists()) {
        // If the document exists, return the names
        return collectionsDoc.data().userProfiles;
      } else {
        // If the document does not exist, return an empty array
        return [];
      }
    } catch (error) {
      console.error("Error fetching user profiles: ", error);
      throw error;
    }
  }

  async updateUserName(oldName, newName) {
    const collectionsDocRef = doc(db, "metadata", "collections");
    const collectionsDoc = await getDoc(collectionsDocRef);

    if (collectionsDoc.exists()) {
      let userProfiles = collectionsDoc.data().userProfiles;
      const oldProfileExists = userProfiles.some(
        (profile) => profile.name === oldName
      );

      if (!oldProfileExists) {
        throw new Error(`Profile with name ${oldName} does not exist.`);
      }

      userProfiles = userProfiles.map((profile) =>
        profile.name === oldName ? { ...profile, name: newName } : profile
      );

      await updateDoc(collectionsDocRef, { userProfiles });
    } else {
      throw new Error("Collections document does not exist.");
    }
  }
}

export default MetaDataEntity;
