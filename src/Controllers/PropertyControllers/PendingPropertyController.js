import RealEstateAgentEntity from "../../Backend/Entity/RealEstateAgentEntity";

// PendingPropertyController class
class PendingPropertyController {
  constructor() {
    this.realEstateAgentEntity = new RealEstateAgentEntity();
  }

  async addPendingProperty(realEstateAgentId, propertyData) {
    try {
      await this.realEstateAgentEntity.addPendingProperty(
        realEstateAgentId,
        propertyData
      );
      return Promise.resolve("Successfully added pending property");
    } catch (error) {
      console.error("Error adding pending property:", error);
      return Promise.reject({
        error: "Could not add pending property. Please try again.",
      });
    }
  }
}
