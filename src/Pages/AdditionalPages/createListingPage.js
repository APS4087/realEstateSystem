import "../../Styles/CreateListing.scss";
import Header from "../../Components/Header";
import { categories, types, facilities } from "../../Assets/data";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import variables from "../../Styles/variables.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { useState, useEffect } from "react";
import { BiTrash } from "react-icons/bi";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

import Carousel from "../../Utils/Carousel";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../../Backend/Firebase/firebaseConfig";
import { Avatar } from "@mui/material";
import avatar from "../../Assets/profile.png";

const CreateListingPage = () => {
  const { currentUser } = useContext(AuthContext);
  const [category, setCategory] = useState("");
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const handleAgentSelect = (agent) => {
    setSelectedAgent(agent);
  };

  useEffect(() => {
    const fetchAgents = async () => {
      const agentsCollection = await getDocs(
        collection(db, "realEstateAgents")
      );
      const agentsData = await Promise.all(
        agentsCollection.docs.map(async (agentDoc) => {
          const agentData = agentDoc.data();
          const userDataDoc = await getDoc(doc(db, "users", agentData.uid));

          return { ...agentData, ...userDataDoc.data() };
        })
      );
      setAgents(agentsData);
    };

    fetchAgents();
  }, []);

  const Card = ({
    title,
    email,
    license,
    profilePicture,
    agent,
    onSelect,
    selected,
  }) => (
    <div
      className={`card ${selected ? "selected" : ""}`}
      onClick={() => onSelect(agent)}
    >
      <Avatar
        alt="Profile Picture"
        src={profilePicture || avatar}
        style={{ margin: "0 auto", width: "100px", height: "100px" }}
      />{" "}
      <h2>{title}</h2>
      <p>Email: {email}</p>
      <p>License: {license}</p>
    </div>
  );

  /* LOCATION */
  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
  });

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };

  /* BASIC COUNTS */
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  /* AMENITIES */
  const [amenities, setAmenities] = useState([]);

  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities((prevAmenities) =>
        prevAmenities.filter((option) => option !== facility)
      );
    } else {
      setAmenities((prev) => [...prev, facility]);
    }
  };

  /* UPLOAD, DRAG & DROP, REMOVE PHOTOS */
  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  /* DESCRIPTION */
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    price: 0,
  });

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };

  const creatorId = currentUser ? currentUser.uid : null;

  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      /* Create a new FormData onject to handle file uploads */
      const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      listingForm.append("category", category);
      listingForm.append("streetAddress", formLocation.streetAddress);
      listingForm.append("aptSuite", formLocation.aptSuite);
      listingForm.append("city", formLocation.city);
      listingForm.append("province", formLocation.province);
      listingForm.append("country", formLocation.country);
      listingForm.append("bedroomCount", bedroomCount);
      listingForm.append("bathroomCount", bathroomCount);
      listingForm.append("amenities", amenities);
      listingForm.append("title", formDescription.title);
      listingForm.append("description", formDescription.description);

      listingForm.append("price", formDescription.price);

      /* Append each selected photos to the FormData object */
      photos.forEach((photo) => {
        listingForm.append("listingPhotos", photo);
      });

      // Log form data to console
      console.log("Listing Form Data: ", {
        category,
        formLocation,
        bedroomCount,
        bathroomCount,
        amenities,
        photos,
        formDescription,
        creatorId,
      });
    } catch (err) {
      console.log("Publish Listing failed", err.message);
    }
  };
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="create-listing">
        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Create{" "}
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Property Listing !
          </span>
        </h1>

        <form onSubmit={handlePost}>
          <div className="create-listing_step1">
            <h2 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
              Step 1: Tell us about your place
            </h2>
            <hr />

            <h3 class="text-2xl font-bold dark:text-white">
              Which of these categories best describes your place?
            </h3>
            <div className="category-list">
              {categories?.map((item, index) => (
                <div
                  className={`category ${
                    category === item.label ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => setCategory(item.label)}
                >
                  <div className="category_icon">{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>

            <h3 class="text-2xl font-bold dark:text-white">
              Where's your place located?
            </h3>
            <div className="full">
              <div className="location">
                <p>Street Address</p>
                <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Apartment, Suite, etc. (if applicable)</p>
                <input
                  type="text"
                  placeholder="Apt, Suite, etc. (if applicable)"
                  name="aptSuite"
                  value={formLocation.aptSuite}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>City</p>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formLocation.city}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Province</p>
                <input
                  type="text"
                  placeholder="Province"
                  name="province"
                  value={formLocation.province}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>Country</p>
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={formLocation.country}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <h3 class="text-2xl font-bold dark:text-white">
              Share some basics about your place
            </h3>
            <div className="basics">
              <div className="basic">
                <p>Bedrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{bedroomCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBedroomCount(bedroomCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Bathrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{bathroomCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBathroomCount(bathroomCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="create-listing_step2">
            <h2 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
              Step 2: Make your place stand out
            </h2>
            <hr />

            <h3 class="text-2xl font-bold dark:text-white">
              Choose tags most suitable for your property
            </h3>
            <div className="amenities">
              {facilities?.map((item, index) => (
                <div
                  className={`facility ${
                    amenities.includes(item.name) ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => handleSelectAmenities(item.name)}
                >
                  <div className="facility_icon">{item.icon}</div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>

            <h3 class="text-2xl font-bold dark:text-white">
              Add some photos of your place
            </h3>
            <div className="photos">
              {photos.length < 1 && (
                <>
                  <input
                    id="image"
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleUploadPhotos}
                    multiple
                  />
                  <label htmlFor="image" className="alone">
                    <div className="icon">
                      <IoIosImages />
                    </div>
                    <p>Upload from your device</p>
                  </label>
                </>
              )}

              {photos.length >= 1 && (
                <>
                  {photos.map((photo, index) => (
                    <div className="photo" key={index}>
                      <img src={URL.createObjectURL(photo)} alt="place" />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(index)}
                      >
                        <BiTrash />
                      </button>
                    </div>
                  ))}
                  <input
                    id="image"
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleUploadPhotos}
                    multiple
                  />
                  <label htmlFor="image" className="together">
                    <div className="icon">
                      <IoIosImages />
                    </div>
                    <p>Upload from your device</p>
                  </label>
                </>
              )}
            </div>

            <h3 class="text-2xl font-bold dark:text-white">
              What make your place attractive and exciting?
            </h3>
            <div className="description">
              <p>Title</p>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={formDescription.title}
                onChange={handleChangeDescription}
                required
              />
              <p>Description</p>
              <textarea
                type="text"
                placeholder="Description"
                name="description"
                value={formDescription.description}
                onChange={handleChangeDescription}
                required
              />

              <p>Now, set your PRICE</p>
              <span>S$</span>
              <input
                type="number"
                placeholder="100"
                name="price"
                value={formDescription.price}
                onChange={handleChangeDescription}
                className="price"
                required
              />
            </div>
            <h3 class="text-2xl font-bold dark:text-white">
              Available Real Estate Agents
            </h3>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Carousel>
                {agents.map((agent, i) => (
                  <Card
                    key={i}
                    title={agent.userName}
                    email={agent.email}
                    license={agent.license}
                    profilePicture={agent.profilePicture}
                    agent={agent}
                    onSelect={handleAgentSelect}
                    selected={selectedAgent && selectedAgent.uid === agent.uid}
                  />
                ))}
              </Carousel>
            </div>
          </div>

          <button className="submit_btn" type="submit">
            CREATE YOUR LISTING
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateListingPage;
