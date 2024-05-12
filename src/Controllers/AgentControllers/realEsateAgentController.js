import RealEstateAgentEntity from "../../Backend/Entity/RealEstateAgentEntity";

class RealEstateAgentController {
  constructor() {
    this.realEstateAgentEntity = new RealEstateAgentEntity();
  }

  async updatePropertyId(agentId, oldPropertyId, newPropertyId) {
    try {
      await this.realEstateAgentEntity.updatePropertyId(
        agentId,
        oldPropertyId,
        newPropertyId
      );
    } catch (error) {
      console.error("Error updating property id: ", error);
      throw error;
    }
  }
}

export default RealEstateAgentController;
