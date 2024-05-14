import PropertyEntity from "../../Backend/Entity/PropertyEntity";

class SearchPropertyController {
  constructor() {
    this.propertyEntity = new PropertyEntity();
  }

  async searchPropertiesByTags(tags) {
    try {
      const properties = await this.propertyEntity.getPropertiesByTags(tags);
      return properties;
    } catch (error) {
      console.error("Error fetching properties by tags: ", error);
      throw error;
    }
  }
}

export default SearchPropertyController;
