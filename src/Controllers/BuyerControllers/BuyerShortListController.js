import BuyerEntity from "../../Backend/Entity/BuyerEntity";

class BuyerShortListController {
  constructor() {
    this.buyerEntity = new BuyerEntity();
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
}

export default BuyerShortListController;
