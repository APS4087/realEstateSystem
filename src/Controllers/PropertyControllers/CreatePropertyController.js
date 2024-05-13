import PropertyEntity from "../../Backend/Entity/PropertyEntity";
import RealEstateAgentEntity from "../../Backend/Entity/RealEstateAgentEntity";
import SellerEntity from "../../Backend/Entity/SellerEntity";

class CreatePropertyController {
  constructor(currentUser) {
    this.propertyEntity = new PropertyEntity();
    this.realEstateAgentEntity = new RealEstateAgentEntity();
    this.sellerEntity = new SellerEntity();
    this.currentUser = currentUser;
  }

  async createProperty(propertyData) {
    try {
      // Add the agentID field to the property data
      propertyData.agentID = this.currentUser.uid;

      // Create the property
      const propertyId = await this.propertyEntity.create(propertyData);

      return propertyId;
    } catch (error) {
      console.error("Error creating property: ", error);
      throw error;
    }
  }

  async addPropertyToListedProperties_Agent(propertyId) {
    try {
      await this.realEstateAgentEntity.addPropertyToListedProperties(
        this.currentUser.uid,
        propertyId
      );
      console.log("Property ID added to listed properties: ", propertyId);
    } catch (error) {
      console.error("Error adding property to listed properties: ", error);
      throw error;
    }
  }

  async addPropertyToListedProperties_Seller(propertyId, sellerId) {
    try {
      await this.sellerEntity.addPropertyToListedProperties(
        sellerId,
        propertyId
      );
      console.log("Property ID added to listed properties: ", propertyId);
    } catch (error) {
      console.error("Error adding property to listed properties: ", error);
      throw error;
    }
  }
  async removePropertyFromPendingProperties(propertyId) {
    try {
      await this.realEstateAgentEntity.removePropertyFromPendingProperties(
        this.currentUser.uid,
        propertyId
      );
      console.log("Property ID removed from pending properties: ", propertyId);
    } catch (error) {
      console.error("Error removing property from pending properties: ", error);
      throw error;
    }
  }
}

export default CreatePropertyController;
