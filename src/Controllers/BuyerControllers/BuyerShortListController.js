import BuyerEntity from "../../Backend/Entity/BuyerEntity";
import PropertyEntity from "../../Backend/Entity/PropertyEntity";

class BuyerShortListController {
  constructor() {
    this.buyerEntity = new BuyerEntity();
    this.propertyEntity = new PropertyEntity();
  }

  async addToShortlist(userId, propertyId) {
    try {
      await this.buyerEntity.addToShortlist(userId, propertyId);
    } catch (error) {
      console.error("Error adding property to shortlist:", error);
      throw error;
    }
  }

  async isShortlisted(userId, propertyId) {
    try {
      return await this.buyerEntity.isShortlisted(userId, propertyId);
    } catch (error) {
      console.error("Error checking if property is shortlisted:", error);
      throw error;
    }
  }

  async getShortListedProperties(userId) {
    try {
      const shortListedPropertiesIds =
        await this.buyerEntity.getShortListedProperties(userId);

      const shortListedProperties = await Promise.all(
        shortListedPropertiesIds.map(async (propertyId) => {
          const property = await this.propertyEntity.getProperty(propertyId);

          if (property) {
            return property;
          } else {
            console.error("Property does not exist");
            return null;
          }
        })
      );

      const existingShortListedProperties = shortListedProperties.filter(
        (property) => property !== null
      );

      return existingShortListedProperties;
    } catch (error) {
      console.error("Error getting bought properties:", error);
      throw error;
    }
  }
}

export default BuyerShortListController;
