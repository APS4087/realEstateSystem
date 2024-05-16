import UserEntity from "../Backend/Entity/UserEntity";
import MetaDataEntity from "../Backend/Entity/MetaDataEntity";

class SuspendUserController {
  constructor() {
    this.userEntity = new UserEntity();
  }

  async suspendUser(userId) {
    try {
      await this.userEntity.suspendUser(userId);
    } catch (error) {
      console.error("Error suspending user:", error);
      throw error;
    }
  }

  async reactivateUser(userId) {
    try {
      await this.userEntity.reactivateUser(userId);
    } catch (error) {
      console.error("Error reactivating user:", error);
      throw error;
    }
  }

  async suspendUserProfile(profileName) {
    try {
      const metaDataEntity = new MetaDataEntity();
      await metaDataEntity.suspendUser(profileName);
    } catch (error) {
      console.error("Error suspending user profile:", error);
      throw error;
    }
  }
  async reactivateUserProfile(profileName) {
    try {
      const metaDataEntity = new MetaDataEntity();
      await metaDataEntity.reactivateUser(profileName);
    } catch (error) {
      console.error("Error reactivating user profile:", error);
      throw error;
    }
  }
}

export default SuspendUserController;
