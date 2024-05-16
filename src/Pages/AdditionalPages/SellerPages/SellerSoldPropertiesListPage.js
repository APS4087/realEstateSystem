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
import PropertyEntity from "../../../Backend/Entity/PropertyEntity";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import avatar from "../../../Assets/profile.png";
import { Create } from "@mui/icons-material";
import CreateReviewController from "../../../Controllers/ReviewControllers/CreateReviewController";
import PropertyController from "../../../Controllers/PropertyControllers/PropertyController";

const SellerSoldPropertiesListPage = () => {
  const { Id } = useParams(); // Retrieve the rental ID from the URL
  const { currentUser } = useContext(AuthContext);
  const [soldRentalDataIDs, setSoldRentalDataIDs] = useState([]);
  const [agentData, setAgentData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  const [soldProperties, setSoldProperties] = useState([]);
  const [shortListCount, setShortListCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);

  const propertyController = new PropertyController();

  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
  }
  useEffect(() => {
    const fetchPendingProperties = async () => {
      if (currentUser && currentUser.uid) {
        const sellerEntity = new SellerEntity();
        const soldProperties = await sellerEntity.getSoldProperties(
          currentUser.uid
        );
        setSoldRentalDataIDs(soldProperties);
      }
    };

    const fetchViewCount = async () => {
      const count = await propertyController.getViewCount(Id);
      setViewCount(count);
    };

    fetchViewCount();
    getNumberOfShortlists(Id);

    fetchPendingProperties();
  }, [currentUser]);
  async function getNumberOfShortlists(propertyId) {
    try {
      const count = await propertyController.getNumberOfShortlist(propertyId);
      //console.log("Shortlist count:", count);
      setShortListCount(count);
    } catch (error) {
      console.error("Error getting shortlist count:", error);
    }
  }

  // Use pendingRentalData if currentUser is a realEstateAgent, otherwise use rentalsData
  const dataToUseIDs = soldRentalDataIDs;
  const rental = soldProperties.find((rental) => rental.id === Id); // Find the rental in the array
  useEffect(() => {
    const fetchProperties = async () => {
      const propertyEntity = new PropertyEntity();

      const properties = await Promise.all(
        soldRentalDataIDs.map(async (id) => {
          const property = await propertyEntity.getProperty(id);
          return property;
        })
      );

      setSoldProperties(properties);
    };

    if (soldRentalDataIDs.length > 0) {
      fetchProperties();
    }
  }, [soldRentalDataIDs]);
  // if the current user is real estate agent, getting the seller info
  useEffect(() => {
    const fetchAgentData = async () => {
      if (rental && rental.sellerId) {
        const agentEntity = new RealEstateAgentEntity();
        const agent = await agentEntity.getAgentDetails(rental.agentID);
        const genericUserData = await agentEntity.getUserData(rental.agentID);
        setAgentData({ ...agent, ...genericUserData });
      }
    };

    fetchAgentData();
  }, [rental]);

  const createReview = async (event) => {
    event.preventDefault();

    const agentId = agentData.uid;
    const reviewerId = currentUser.uid;
    const reviewData = { rating, review, reviewerId };
    const createReviewController = new CreateReviewController();
    console.log(agentId, reviewData);
    try {
      const result = await createReviewController.addRatingAndReview(
        agentId,
        reviewData
      );

      if (result) {
        Swal.fire({
          icon: "success",
          title: "Review added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        onCloseModal();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.log("Failed to add review.");
      }
    } catch (error) {
      console.error("An error occurred while adding the review.", error);
    }
  };

  if (!rental) return <div>Rental not found</div>;

  return (
    <div>
      <Shortcutbar />
      <Carousel images={rental.listingPhotos} />
      <div className="ml-[20rem] w-[65rem] justify-between flex gap-8 pb-5">
        <div className="w-{$p.length*2} px-4 inline-block text-green-400 border-green-300 border-2 rounded-lg">
          <p className="font-semibold text-[25px] pb-1">{rental.tags[0]}</p>
        </div>
        <div className="flex">
          <div className="flex items-center w-{$p.length*2} gap-2 py-1 px-3">
            <BsFillEyeFill className="" />
            <p className="font-semibold text-[19px]">Views: {viewCount}</p>
          </div>
          <div className="flex items-center w-{$p.length*2} gap-2 py-1 px-3">
            <TiBookmark className="" />
            <p className="font-semibold text-[19px]">
              Shortlists: {shortListCount}
            </p>
          </div>
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
      <RealEstateAgent agentDetails={agentData} />
      <div className="flex justify-center">
        {/*Review Button*/}
        <>
          <div className="ml-[50rem] pb-6">
            <Button onClick={() => setOpenModal(true)}>Review Agent</Button>
          </div>
          <Modal show={openModal} size="md" onClose={onCloseModal} popup>
            <Modal.Header />
            <Modal.Body>
              <h3 className="px-5 text-xl font-medium text-gray-900 dark:text-white">
                Your Property has been sold! <br />
                Time to Rate & Review the Agent
              </h3>
              <form className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2 flex items-center gap-4">
                    <img
                      src={agentData.profilePicture || avatar}
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
                      onChange={(event) => setRating(event.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option selected="5">5</option>
                      <option selected="4">4</option>
                      <option selected="3">3</option>
                      <option selected="2">2</option>
                      <option selected="1">1</option>
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
                      onChange={(event) => setReview(event.target.value)}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write agent review here"
                    ></textarea>
                  </div>
                </div>
                <button
                  onClick={createReview}
                  className="ml-[4rem] w-[12rem] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Rate & Review
                </button>
              </form>
            </Modal.Body>
          </Modal>
        </>
      </div>
    </div>
  );
};

export default SellerSoldPropertiesListPage;
