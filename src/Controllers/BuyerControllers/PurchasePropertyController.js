import BuyerEntity from "../../Backend/Entity/BuyerEntity";
import PropertyEntity from "../../Backend/Entity/PropertyEntity";
import SellerEntity from "../../Backend/Entity/SellerEntity";

class PurchasePropertyController {
  constructor() {
    this.buyerEntity = new BuyerEntity();
    this.propertyEntity = new PropertyEntity();
    this.sellerEnity = new SellerEntity();
  }

  async handlePurchase(userId, propertyId, sellerId) {
    try {
      // Add the property to the buyer's purchasedProperties array
      await this.buyerEntity.purchaseProperty(userId, propertyId);
      await this.sellerEnity.soldProperty(sellerId, propertyId);
      // Mark the property as sold
      await this.propertyEntity.markAsSold(propertyId);
    } catch (error) {
      console.error("Error handling purchase:", error);
      throw error;
    }
  }
}

export default PurchasePropertyController;
