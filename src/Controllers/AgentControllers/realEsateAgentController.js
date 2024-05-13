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

  async getAgentData(agentID) {
    const agent = await this.realEstateAgentEntity.getAgentDetails(agentID);
    const genericUserData = await this.realEstateAgentEntity.getUserData(
      agentID
    );

    return { ...agent, ...genericUserData };
  }
}

export default RealEstateAgentController;
