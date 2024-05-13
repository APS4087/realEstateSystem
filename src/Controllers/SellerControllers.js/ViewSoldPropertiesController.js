import BuyerEntity from "../../Backend/Entity/BuyerEntity";
import PropertyEntity from "../../Backend/Entity/PropertyEntity";
import RealEstateAgentEntity from "../../Backend/Entity/RealEstateAgentEntity";
import SellerEntity from "../../Backend/Entity/SellerEntity";

class ViewSoldPropertiesController {
  constructor() {
    this.sellerEntity = new SellerEntity();

    this.propertyEntity = new PropertyEntity();
  }

  async getSoldProperties(userId) {
    try {
      const soldPropertyIds = await this.sellerEntity.getSoldProperties(userId);

      const soldProperties = await Promise.all(
        soldPropertyIds.map(async (propertyId) => {
          const property = await this.propertyEntity.getProperty(propertyId);

          if (property) {
            return property;
          } else {
            console.error("Property does not exist");
            return null;
          }
        })
      );

      const existingSoldProperties = soldProperties.filter(
        (property) => property !== null
      );

      return existingSoldProperties;
    } catch (error) {
      console.error("Error getting listing properties:", error);
      throw error;
    }
  }
}

export default ViewSoldPropertiesController;
