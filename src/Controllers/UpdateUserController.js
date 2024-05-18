import UserEntity from "../Backend/Entity/UserEntity";

class UpdateUserController {
  constructor() {
    this.userEntity = new UserEntity();
  }

  async updateUser(userId, userData) {
    try {
      console.log("userData: ", userData);
      await this.userEntity.updateUser(userId, userData);
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
  async updateOtherUserDetails(userId, userData) {
    try {
      await this.userEntity.updateOtherUserDetails(userId, userData);
    } catch (error) {
      console.error("Error updating user details:", error);
      throw error;
    }
  }
}

export default UpdateUserController;
