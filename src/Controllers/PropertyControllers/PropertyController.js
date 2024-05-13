import BuyerEntity from "../../Backend/Entity/BuyerEntity";
import PropertyEntity from "../../Backend/Entity/PropertyEntity";

class PropertyController {
  constructor() {
    this.buyerEntity = new BuyerEntity();
    this.propertyEntity = new PropertyEntity();
  }

  async getBoughtProperties(userId) {
    try {
      const boughtPropertyIds = await this.buyerEntity.getBoughtProperties(
        userId
      );

      const boughtProperties = await Promise.all(
        boughtPropertyIds.map(async (propertyId) => {
          const property = await this.propertyEntity.getProperty(propertyId);

          if (property) {
            return property;
          } else {
            console.error("Property does not exist");
            return null;
          }
        })
      );

      const existingBoughtProperties = boughtProperties.filter(
        (property) => property !== null
      );

      return existingBoughtProperties;
    } catch (error) {
      console.error("Error getting bought properties:", error);
      throw error;
    }
  }
}

export default PropertyController;
