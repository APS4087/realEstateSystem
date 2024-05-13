import BuyerEntity from "../../Backend/Entity/BuyerEntity";
import PropertyEntity from "../../Backend/Entity/PropertyEntity";

class PurchasePropertyController {
  constructor() {
    this.buyerEntity = new BuyerEntity();
    this.propertyEntity = new PropertyEntity();
  }

  async handlePurchase(userId, propertyId) {
    try {
      // Add the property to the buyer's purchasedProperties array
      await this.buyerEntity.purchaseProperty(userId, propertyId);

      // Mark the property as sold
      await this.propertyEntity.markAsSold(propertyId);
    } catch (error) {
      console.error("Error handling purchase:", error);
      throw error;
    }
  }
}

export default PurchasePropertyController;
