import RealEstateAgentEntity from "../../Backend/Entity/RealEstateAgentEntity";

class CreateReviewController {
  constructor() {
    this.realEstateAgentEntity = new RealEstateAgentEntity();
  }

  async addRatingAndReview(agentId, reviewData) {
    try {
      const result = await this.realEstateAgentEntity.addRatingAndReview(
        agentId,
        reviewData
      );

      if (result) {
        return true;
      } else {
        console.log("Failed to add review.");
        return false;
      }
    } catch (error) {
      console.error("An error occurred while adding the review.", error);
      return false;
    }
  }
}

export default CreateReviewController;
