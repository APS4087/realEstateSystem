import PropertyEntity from "../../Backend/Entity/PropertyEntity";

class UpdatePropertyController {
  constructor() {
    this.propertyEntity = new PropertyEntity();
  }

  async updateProperty(propertyId, newListingData) {
    try {
      await this.propertyEntity.updateProperty(propertyId, newListingData);
      console.log("Property updated successfully");
    } catch (error) {
      console.error("Error updating property:", error);
    }
  }
}

export default UpdatePropertyController;
