import React from "react";
import { useParams } from "react-router-dom";
import Shortcutbar from "../Shortcutbar";
import Carousel from "../carousel";
import Mortgage from "../mortgage";
import RealEstateAgent from "../../../Components/Cards/RealEstateCards/realEstateAgent";
import Swal from "sweetalert2";
import RatingPopUp from "../RatingPopUp";
import SellerEntity from "../../../Backend/Entity/SellerEntity";
import CreatePropertyController from "../../../Controllers/PropertyControllers/CreatePropertyController";
import { TiBookmark } from "react-icons/ti";
import { BsFillEyeFill } from "react-icons/bs";
import { rentalsData } from "../../../Assets/data";
import { useState, useEffect } from "react";
import RealEstateAgentEntity from "../../../Backend/Entity/RealEstateAgentEntity";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import RealEstateAgentController from "../../../Controllers/AgentControllers/realEsateAgentController";

const PendingPropertyListPage = () => {
  const { Id } = useParams(); // Retrieve the rental ID from the URL
  const { currentUser } = useContext(AuthContext);
  const [pendingRentalData, setPendingRentalData] = useState([]);
  const [sellerData, setSellerData] = useState([]);

  useEffect(() => {
    const fetchPendingProperties = async () => {
      if (currentUser && currentUser.uid) {
        const realEstateAgentEntity = new RealEstateAgentEntity();
        const pendingProperties =
          await realEstateAgentEntity.getPendingProperties(currentUser.uid);
        setPendingRentalData(pendingProperties);
      }
    };

    fetchPendingProperties();
  }, [currentUser]);

  // Use pendingRentalData if currentUser is a realEstateAgent, otherwise use rentalsData
  const dataToUse = pendingRentalData;
  const rental = dataToUse.find((rental) => rental.id === Id); // Find the rental in the array

  // if the current user is real estate agent, getting the seller info
  useEffect(() => {
    const fetchSellerData = async () => {
      if (rental && rental.sellerId) {
        const sellerEntity = new SellerEntity();
        const seller = await sellerEntity.getSellerData(rental.sellerId);
        const genericUserData = await sellerEntity.getUserData(rental.sellerId);
        setSellerData({ ...seller, ...genericUserData });
      }
    };

    fetchSellerData();
  }, [rental]);

  if (!rental) return <div>Rental not found</div>;

  const createPropertyEntity = async () => {
    try {
      const oldRentalID = rental.id;
      const propertyController = new CreatePropertyController(currentUser);
      const propertyId = await propertyController.createProperty(rental);
      //console.log("Property created with ID: ", propertyId);

      const realEstateAgentController = new RealEstateAgentController();
      // console.log("Updating property ID for agent: ", oldRentalID, propertyId);
      await realEstateAgentController.updatePropertyId(
        currentUser.uid,
        oldRentalID,
        propertyId
      );

      // Add the property ID to the listedProperties field for the agent
      await propertyController.addPropertyToListedProperties_Agent(propertyId);
      // Add the property ID to the listedProperties field for the seller
      console.log(rental.sellerId);
      console.log(propertyId);
      await propertyController.addPropertyToListedProperties_Seller(
        propertyId,
        rental.sellerId
      );
      // Remove the property ID from the pendingProperties field for the agent
      await propertyController.removePropertyFromPendingProperties(propertyId);

      Swal.fire({
        title: "Success!",
        text: `The property by ${sellerData.userName} has been created !`,
        icon: "success",
      });
    } catch (error) {
      console.error("Error creating property: ", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div>
      <Shortcutbar />
      <Carousel images={rental.listingPhotos} />
      <div className="ml-[20rem] w-[65rem] justify-between flex gap-8 pb-5">
        <div className="w-{$p.length*2} px-4 inline-block text-green-400 border-green-300 border-2 rounded-lg">
          <p className="font-semibold text-[25px] pb-1">
            {rental.tags.includes("Available Property")
              ? "Available Property"
              : "Sold Property"}
          </p>
        </div>
      </div>
      <div className="w-[65rem] ml-80 items-center pb-4 font-bold text-[30px] border-b-2">
        <p className="pb-1">{rental.title}</p>
        {rental.tags.map((tag, index) => (
          <div
            key={index}
            className="w-{$p.length*2} py-2 px-3 inline-block bg-gray-600 text-white border rounded-full display:flex mr-2"
          >
            <p className="font-semibold text-[15px]">{tag}</p>
          </div>
        ))}
      </div>
      <div className="w-[65rem] ml-80 items-center py-7 border-b-2">
        <p className="font-semibold text-[17px]">Price starts from:</p>
        <p className="font-bold text-[30px]">S${rental.price}</p>
      </div>
      <div
        className="w-[65rem] ml-80 items-center py-10 border-b-2"
        name="about"
      >
        <p className="font-bold text-[30px]">About this property</p>
        <p className="font-semibold text-[17px] py-3">{rental.description}</p>
      </div>
      <div
        className="w-[65rem] ml-80 items-center pt-10 pb-5 border-b-2"
        name="location"
      >
        <p className="font-bold text-[30px]">Location</p>
        <p className="font-semibold text-[18px] py-3 pb-4">
          <p className="font-semibold text-[17px] py-3">
            StreetAddress: {rental.streetAddress} <br />
            Province: {rental.province} <br />
            City: {rental.city} <br />
            Country: {rental.country}
          </p>
        </p>
      </div>
      <div
        className="w-[65rem] ml-80 items-center pt-10 pb-5 border-b-2"
        name="mortgage"
      >
        <p className="font-bold text-[30px]">Estimated Mortgage</p>
        <Mortgage />
      </div>
      <RealEstateAgent agentDetails={sellerData} />
      <div className="flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={createPropertyEntity}
        >
          Create Property
        </button>
      </div>
    </div>
  );
};

export default PendingPropertyListPage;
