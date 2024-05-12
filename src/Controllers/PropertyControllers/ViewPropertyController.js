import PropertyEntity from "../../Backend/Entity/PropertyEntity";

class ViewPropertyController {
  constructor() {
    this.propertyEntity = new PropertyEntity();
  }

  async getProperties() {
    try {
      const properties = await this.propertyEntity.getAllProperties();
      return properties;
    } catch (error) {
      console.error("Error fetching properties: ", error);
      throw error;
    }
  }
}

export default ViewPropertyController;
