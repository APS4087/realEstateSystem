import React from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import ViewPropertyController from "../../../Controllers/PropertyControllers/ViewPropertyController";

const AgentListedPropertiesDetails = () => {
  const { Id } = useParams(); // Retrieve the rental ID from the URL
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [agentData, setAgentData] = useState(""); // State to store the agent data

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
      <RealEstateAgent agentDetails={agentData} />
      <div className="flex justify-center">
        {/*Review Button*/}
        <>
          <div className="ml-[50rem] pb-6">
            <Button onClick={navigate(`/updateListingPage/${Id}`)}>
              Update
            </Button>
          </div>
        </>
      </div>
    </div>
  );
};

export default AgentListedPropertiesDetails;
