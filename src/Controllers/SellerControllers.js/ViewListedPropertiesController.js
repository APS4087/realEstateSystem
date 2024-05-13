import BuyerEntity from "../../Backend/Entity/BuyerEntity";
import PropertyEntity from "../../Backend/Entity/PropertyEntity";
import RealEstateAgentEntity from "../../Backend/Entity/RealEstateAgentEntity";
import SellerEntity from "../../Backend/Entity/SellerEntity";

class ViewListedPropertiesController {
  constructor() {
    this.sellerEntity = new SellerEntity();

    this.propertyEntity = new PropertyEntity();
  }

  async getListingProperties(userId) {
    try {
      const listedPropertyIds = await this.sellerEntity.getListedProperties(
        userId
      );

      const listedProperties = await Promise.all(
        listedPropertyIds.map(async (propertyId) => {
          const property = await this.propertyEntity.getProperty(propertyId);

          if (property) {
            return property;
          } else {
            console.error("Property does not exist");
            return null;
          }
        })
      );

      const existingListedProperties = listedProperties.filter(
        (property) => property !== null
      );

      return existingListedProperties;
    } catch (error) {
      console.error("Error getting listing properties:", error);
      throw error;
    }
  }
}

export default ViewListedPropertiesController;
