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
}

export default ViewAllUserDataController;
