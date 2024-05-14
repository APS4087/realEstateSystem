import UserEntity from "../../Backend/Entity/UserEntity";

class GetReviewerDataController {
  constructor() {
    this.userEntity = new UserEntity();
  }

  async getUserData(userId) {
    try {
      const userData = await this.userEntity.getUserData(userId);
      return userData;
    } catch (error) {
      console.error("Error getting user data:", error);
      throw error;
    }
  }
}

export default GetReviewerDataController;
