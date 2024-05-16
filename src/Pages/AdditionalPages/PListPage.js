import React from "react";
import { useParams } from "react-router-dom";
import Shortcutbar from "../AdditionalPages/Shortcutbar";
import Carousel from "../AdditionalPages/carousel";
import Mortgage from "../AdditionalPages/mortgage";
import RealEstateAgent from "../../Components/Cards/RealEstateCards/realEstateAgent";
import Button from "@mui/material/Button";
import RatingPopUp from "../AdditionalPages/RatingPopUp";

import { Link } from "react-router-dom";
import { BsFlag } from "react-icons/bs";

import { AiOutlineSend, AiOutlineUser } from "react-icons/ai";
import { Link as LinkScroll } from "react-scroll";
import BasicMenu from "../../Components/Header/ProfileMenu";

import { Checkbox, Label, Modal, TextInput } from "flowbite-react";
import avatar from "../../Assets/profile.png";
import logo from "../../Assets/logo/logo-title.jpg";
import { useNavigate } from "react-router-dom";
import { TiBookmark } from "react-icons/ti";
import { BsFillEyeFill } from "react-icons/bs";
import { rentalsData } from "../../Assets/data";
import { useState, useEffect } from "react";
import RealEstateAgentEntity from "../../Backend/Entity/RealEstateAgentEntity";
import BuyerShortListController from "../../Controllers/BuyerControllers/BuyerShortListController";
import ViewPropertyController from "../../Controllers/PropertyControllers/ViewPropertyController";
import RealEstateAgentController from "../../Controllers/AgentControllers/realEsateAgentController";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import PurchasePropertyController from "../../Controllers/BuyerControllers/PurchasePropertyController";
import Swal from "sweetalert2";
import CreateReviewController from "../../Controllers/ReviewControllers/CreateReviewController";
import PropertyController from "../../Controllers/PropertyControllers/PropertyController";
import LoadingAnimation from "../../Components/LoadingAnimation";

const PListPage = () => {
  const { Id } = useParams(); // Retrieve the rental ID from the URL
  const [properties, setProperties] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [agentData, setAgentData] = useState(null); // State to store the agent data
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [viewCount, setViewCount] = useState(0);
  const [shortListCount, setShortListCount] = useState(0);
  const propertyController = new PropertyController();
  useEffect(() => {
    // If a property ID is present, increment the view count
    if (Id) {
      propertyController.incrementViewCount(Id);
    }
  }, [Id]);
  useEffect(() => {
    // If a property ID is present, get the view count
    if (Id) {
      const fetchViewCount = async () => {
        const count = await propertyController.getViewCount(Id);
        setViewCount(count);
      };

      fetchViewCount();
    }
  }, [Id]);

  // for popup review on click
  const onCloseModal = () => {
    setOpenModal(false);
    setEmail("");
  };
  const buyerController = new BuyerShortListController();

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
  async function addToShortlist(propertyId) {
    try {
      await buyerController.addToShortlist(currentUser.uid, propertyId);
      await propertyController.incrementShortlistCount(propertyId);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "The Property has been shortlisted!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("Property added to shortlist!");
    } catch (error) {
      console.error("Error adding property to shortlist:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Property was not shortlisted!",
      });
    }
  }

  async function getNumberOfShortlists(propertyId) {
    try {
      const count = await propertyController.getNumberOfShortlist(propertyId);
      //console.log("Shortlist count:", count);
      setShortListCount(count);
    } catch (error) {
      console.error("Error getting shortlist count:", error);
    }
  }

  // When buyer press the purchase button
  const purchaseProperty = async (buyerID, propertyId, sellerId) => {
    const purchaseController = new PurchasePropertyController();
    setOpenModal(true);
    try {
      await purchaseController.handlePurchase(buyerID, propertyId, sellerId);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "The Property has been Purchased!",
        showConfirmButton: false,
        timer: 1500,
      });
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
  async function checkIsShortlisted(propertyId) {
    if (currentUser && currentUser.userType !== "buyer") {
      console.log(`User is not a buyer.`);
      return false;
    }
    try {
      console.log(`Checking if property ${propertyId} is shortlisted.`);
      const isShortlisted = await buyerController.isShortlisted(
        currentUser.uid,
        propertyId
      );
      console.log(
        `Property ${propertyId} is ${isShortlisted ? "" : "not"} shortlisted.`
      );

      return isShortlisted;
    } catch (error) {
      console.error("Error checking if property is shortlisted:", error);
    }
  }

  useEffect(() => {
    const fetchProperties = async () => {
      const viewPropertyController = new ViewPropertyController();
      const properties = await viewPropertyController.getProperties();
      getNumberOfShortlists(Id);
      console.log(shortListCount);
      setProperties(properties);
      setIsLoading(false); // Add this line
    };

    fetchProperties();
  }, []);
  const dataToUse = properties;
  const rental = dataToUse.find((rental) => rental.id === Id);

  // runs when page loads
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
  useEffect(() => {
    if (!rental) {
      return; // Exit the effect if rental is not defined
    }

    const fetchIsShortlisted = async () => {
      const result = await checkIsShortlisted(rental.id);
      setIsShortlisted(result);
    };

    fetchIsShortlisted();
  }, [rental]);
  if (isLoading) {
    return <LoadingAnimation />;
  }
  // console.log("View count:", rental.viewCount);

  return (
    <div>
      <div className="sticky top-0 z-50 bg-white shadow-lg shadow-gray-200">
        <div className="flex justify-between items-center sm:mx-6 md:mx-12 lg:mx-12">
          {/* Left */}
          <div className=" h-[4rem] flex">
            <Link to="/">
              <img src={logo} className="h-[4rem] flex object-cover" />
            </Link>
          </div>
          {/* Middle Left */}
          <div className="lg:flex gap-5">
            <LinkScroll to="carousel" smooth={true} duration={500}>
              <button>Overview</button>
            </LinkScroll>
            <LinkScroll to="about" smooth={true} duration={500}>
              <button>About</button>
            </LinkScroll>
            <LinkScroll to="location" smooth={true} duration={500}>
              <button>Location</button>
            </LinkScroll>
            <LinkScroll to="mortgage" smooth={true} duration={500}>
              <button>Mortgage</button>
            </LinkScroll>
            <LinkScroll to="realEstate" smooth={true} duration={500}>
              <button>RE Agent</button>
            </LinkScroll>
          </div>
          {/* Middle Right */}
          <div className="flex text-gray-600">
            {currentUser && currentUser.userType === "buyer" && (
              <button
                className="flex items-center hover:bg-gray-200 duration-200 gap-2 py-1 px-3 sm:px-4 rounded-full text-[14px] sm:text-[16px]"
                onClick={() => addToShortlist(rental.id)}
              >
                <TiBookmark className="" />
                <div className="">Shortlist</div>
              </button>
            )}
            <div className="flex items-center hover:bg-gray-200 duration-200 gap-2 sm:px-4 rounded-full text-[14px] sm:text-[16px]">
              <AiOutlineSend className="" />
              <div className="">Share</div>
            </div>
            <div className="flex items-center hover:bg-gray-200 duration-200 gap-2 sm:px-4 rounded-full text-[14px] sm:text-[16px]">
              <BsFlag className="" />
              <div className="">Report</div>
            </div>
          </div>
          {/* Right */}
          <div className="flex items-center pr-2 font-semibold text-gray-600">
            <div className="profile-div">
              <BasicMenu />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Carousel images={rental.listingPhotos} />
      </div>
      <div className="ml-[20rem] w-[65rem] justify-between flex gap-8 pb-5">
        <div className="w-{$p.length*2} px-4 inline-block text-green-400 border-green-300 border-2 rounded-lg">
          <p className="font-semibold text-[25px] pb-1">
            {rental.tags.includes("Available Property")
              ? "Available Property"
              : "Sold Property"}
          </p>
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
        <p className="pb-1">
          {rental.title}
          {isShortlisted && (
            <span className="ml-2 text-green-500">(Shortlisted)</span>
          )}
        </p>
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
              onClick={() =>
                purchaseProperty(currentUser.uid, rental.id, rental.sellerId)
              }
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
                    Successful Purchase! <br />
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
                </>
              )}
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <div className="ml-[50rem] pb-6">
          <Button variant="contained" onClick={() => navigate(-1)}>
            Return
          </Button>
        </div>
      )}
    </div>
  );
};

export default PListPage;
