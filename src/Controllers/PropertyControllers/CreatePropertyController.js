import PropertyEntity from "../../Backend/Entity/PropertyEntity";

class CreatePropertyController {
  constructor(currentUser) {
    this.propertyEntity = new PropertyEntity();
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
}

export default CreatePropertyController;
