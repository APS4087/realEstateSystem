// UserController.js
import UserEntity from "../Backend/Entity/UserEntity";

class ViewAllUserDataController {
  constructor() {
    this.userEntity = new UserEntity();
  }

  async fetchAllUsers() {
    try {
      const users = await this.userEntity.getAllUsers();
      // Process the user data as needed
      return users;
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw error;
    }
  }
  async getUserById(userId) {
    try {
      const user = await this.userEntity.getUserData(userId);

      return user;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  }
}

export default ViewAllUserDataController;
