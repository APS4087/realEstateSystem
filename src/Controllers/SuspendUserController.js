import UserEntity from "../Backend/Entity/UserEntity";

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
}

export default SuspendUserController;
