import RealEstateAgentEntity from "../../Backend/Entity/RealEstateAgentEntity";

class ViewReviewController {
  constructor() {
    this.realEstateAgentEntity = new RealEstateAgentEntity();
  }

  async getReviews(agentId) {
    try {
      console.log("In getReviews controller", agentId);
      const reviews = await this.realEstateAgentEntity.getAgentReviews(agentId);
      return reviews || []; // If reviews is undefined, return an empty array
    } catch (error) {
      console.error("Error getting reviews:", error);
      throw error;
    }
  }
}

export default ViewReviewController;
