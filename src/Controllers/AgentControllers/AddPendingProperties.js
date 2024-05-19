import RealEstateAgentEntity from "../../Backend/Entity/RealEstateAgentEntity";

class AddPendingPropertyController {
  constructor() {
    this.realEstateAgentEntity = new RealEstateAgentEntity();
  }

  async addPendingProperty(agentId, listingData) {
    try {
      this.realEstateAgentEntity.addPendingProperty(agentId, listingData);
    } catch (error) {
      console.error("Error adding pending property: ", error);
      throw error;
    }
  }
}

export default AddPendingPropertyController;
