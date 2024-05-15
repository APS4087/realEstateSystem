import MetaDataEntity from "../../Backend/Entity/TheCreatorEntity";

class TheCreatorController {
  constructor() {
    this.metaDataEntity = new MetaDataEntity();
  }

  async createCollection(profileName) {
    try {
      await this.metaDataEntity.createCollection(profileName);
    } catch (error) {
      console.error("Error creating collection:", error);
      throw error;
    }
  }

  async fetchUserProfiles() {
    try {
      return await this.metaDataEntity.fetchUserProfiles();
    } catch (error) {
      console.error("Error fetching user profiles:", error);
      throw error;
    }
  }
}

export default TheCreatorController;
