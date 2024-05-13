import React from "react";
import { useParams } from "react-router-dom";
import Shortcutbar from "../AdditionalPages/Shortcutbar";
import Carousel from "../AdditionalPages/carousel";
import Mortgage from "../AdditionalPages/mortgage";
import RealEstateAgent from "../../Components/Cards/RealEstateCards/realEstateAgent";
import Button from "@mui/material/Button";
import RatingPopUp from "../AdditionalPages/RatingPopUp";

import { Checkbox, Label, Modal, TextInput } from "flowbite-react";

import logo from "../../Assets/logo/logo-title.png";
import { useNavigate } from "react-router-dom";
import { TiBookmark } from "react-icons/ti";
import { BsFillEyeFill } from "react-icons/bs";
import { rentalsData } from "../../Assets/data";
import { useState, useEffect } from "react";
import RealEstateAgentEntity from "../../Backend/Entity/RealEstateAgentEntity";

import ViewPropertyController from "../../Controllers/PropertyControllers/ViewPropertyController";
import RealEstateAgentController from "../../Controllers/AgentControllers/realEsateAgentController";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import PurchasePropertyController from "../../Controllers/BuyerControllers/PurchasePropertyController";
import Swal from "sweetalert2";

const PListPage = () => {
  const { Id } = useParams(); // Retrieve the rental ID from the URL
  const [properties, setProperties] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [agentData, setAgentData] = useState(null); // State to store the agent data
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");

  // for popup review on click
  const onCloseModal = () => {
    setOpenModal(false);
    setEmail("");
  };

  // for popup review on click
  const purchaseProperty = async (buyerID, propertyId) => {
    const purchaseController = new PurchasePropertyController();
    setOpenModal(true);
    try {
      await purchaseController.handlePurchase(buyerID, propertyId);
      console.log("Purchase successful!");
    } catch (error) {
      setOpenModal(false);
      console.error("Error handling purchase:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Property Already Purchase.",
      });
    }
  };

  useEffect(() => {
    const fetchProperties = async () => {
      const viewPropertyController = new ViewPropertyController();
      const properties = await viewPropertyController.getProperties();
      setProperties(properties);
      setIsLoading(false); // Add this line
    };

    fetchProperties();
  }, []);
  const dataToUse = properties;
  const rental = dataToUse.find((rental) => rental.id === Id);

  useEffect(() => {
    const fetchAgentData = async () => {
      if (!rental || !rental.agentID) {
        return; // Return early if rental or rental.agentID is not defined
      }

      const agentController = new RealEstateAgentController();

      const agentData = await agentController.getAgentData(rental.agentID);
      setAgentData(agentData);
    };

    fetchAgentData();
  }, [rental]);
  if (isLoading) {
    // Add this block
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Shortcutbar />
      <div>
        <Carousel images={rental.listingPhotos} />
      </div>
      <div className="ml-[20rem] w-[65rem] justify-between flex gap-8 pb-5">
        <div className="w-{$p.length*2} px-4 inline-block text-green-400 border-green-300 border-2 rounded-lg">
          <p className="font-semibold text-[25px] pb-1">{rental.tags[0]}</p>
        </div>
        <div className="flex">
          <div className="flex items-center w-{$p.length*2} gap-2 py-1 px-3">
            <BsFillEyeFill className="" />
            <p className="font-semibold text-[19px]">
              Views: {rental.viewCount}
            </p>
          </div>
          <div className="flex items-center w-{$p.length*2} gap-2 py-1 px-3">
            <TiBookmark className="" />
            <p className="font-semibold text-[19px]">
              Shortlists: {rental.shortCount}
            </p>
          </div>
        </div>
      </div>
      <div className="w-[65rem] ml-80 items-center pb-4 font-bold text-[30px] border-b-2">
        <p className="pb-1">{rental.title}</p>
        <div className="w-{$p.length*2} py-2 px-3 inline-block bg-gray-600 text-white border rounded-full">
          <p className="font-semibold text-[15px]">{rental.tags[1]}</p>
        </div>
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
          Singapore Institute of management, idk
        </p>
        <div className="w-{$p.length*2} py-2 px-3 inline-block bg-gray-600 text-white border rounded-full">
          <p className="font-semibold text-[15px]">{rental.tags[2]}</p>
        </div>
      </div>
      <div
        className="w-[65rem] ml-80 items-center pt-10 pb-5 border-b-2"
        name="mortgage"
      >
        <p className="font-bold text-[30px]">Estimated Mortgage</p>
        <Mortgage />
      </div>
      {agentData ? (
        <RealEstateAgent agentDetails={agentData} />
      ) : (
        <div>Loading agent data...</div>
      )}

      {/*Bottom buttom */}
      {currentUser && currentUser.userType === "buyer" ? (
        <>
          <div className="ml-[50rem] pb-6">
            <Button
              variant="contained"
              onClick={() => purchaseProperty(currentUser.uid, rental.id)}
            >
              Purchase
            </Button>
          </div>
          <Modal show={openModal} size="md" onClose={onCloseModal} popup>
            <Modal.Header />
            <Modal.Body>
              {!agentData ? (
                <div>Loading...</div>
              ) : (
                <>
                  <h3 className="px-5 text-xl font-medium text-gray-900 dark:text-white">
                    Purchase Sucessful!
                  </h3>
                  <form className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2 flex items-center gap-4">
                        <img
                          src={agentData.profilePicture || logo}
                          className="h-[4rem] flex object-cover border rounded-[50rem] w-[4.3rem]"
                        />
                        <p className="mb-3">{agentData.userName}</p>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          for="category"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Rating
                        </label>
                        <select
                          id="category"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                          <option selected="">5</option>
                          <option value="FOUR">4</option>
                          <option value="THREE">3</option>
                          <option value="TWO">2</option>
                          <option value="ONE">1</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label
                          for="description"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Review
                        </label>
                        <textarea
                          id="description"
                          rows="4"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Write agent review here"
                        ></textarea>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="ml-[4rem] w-[12rem] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Rate & Review
                    </button>
                  </form>
                </>
              )}
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <div className="ml-[50rem] pb-6">
          <Button variant="contained" onClick={() => navigate(-1)}>
            Return to Home Page
          </Button>
        </div>
      )}
    </div>
  );
};

export default PListPage;
