import "../../Styles/CreateListing.scss";
import Header from "../../Components/Header";
import { categories, facilities } from "../../Assets/data";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import variables from "../../Styles/variables.scss";
import { IoIosImages } from "react-icons/io";
import { useState, useEffect } from "react";
import { BiTrash } from "react-icons/bi";
import { storage, db } from "../../Backend/Firebase/firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

import Carousel from "../../Utils/Carousel";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { Avatar } from "@mui/material";
import avatar from "../../Assets/profile.png";
import RealEstateAgentEntity from "../../Backend/Entity/RealEstateAgentEntity";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

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

  // Initialize tags with "Available Property"
  const [tags, setTags] = useState(["Available Property"]);

  const handleSelectTags = (tag) => {
    if (tags.includes(tag)) {
      setTags((prevTag) => prevTag.filter((option) => option !== tag));
    } else {
      setTags((prev) => [...prev, tag]);
    }
  };

  /* UPLOAD, DRAG & DROP, REMOVE PHOTOS */
  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = async (e) => {
    const newPhotos = e.target.files;
    const photoURLs = [];

    for (let i = 0; i < newPhotos.length; i++) {
      const date = new Date().getTime();
      const storageRef = ref(storage, `${sellerId + date + i}`);
      await uploadBytesResumable(storageRef, newPhotos[i]);
      const url = await getDownloadURL(storageRef);
      photoURLs.push(url);
    }

    setPhotos((prevPhotos) => [...prevPhotos, ...photoURLs]);
  };

  const handleRemovePhoto = async (index) => {
    // Get the URL of the photo to remove
    const photoURL = photos[index];

    // Create a reference to the file to delete
    const photoRef = ref(storage, photoURL);

    // Delete the file
    await deleteObject(photoRef);

    // Remove the photo's URL from the photos array
    setPhotos((prevPhotos) => {
      const newPhotos = [...prevPhotos];
      newPhotos.splice(index, 1);
      return newPhotos;
    });
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

  const sellerId = currentUser ? currentUser.uid : null;

  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();

    // TODO: CHANGE TO BCE STRUCTURE
    try {
      /* Create a new object to handle data */
      const listingData = {
        id: Math.random().toString(36).substr(2, 9),
        sellerId: sellerId,
        category: category,
        streetAddress: formLocation.streetAddress,
        aptSuite: formLocation.aptSuite,
        city: formLocation.city,
        province: formLocation.province,
        country: formLocation.country,
        bedroomCount: bedroomCount,
        bathroomCount: bathroomCount,
        tags: tags,
        title: formDescription.title,
        description: formDescription.description,
        price: formDescription.price,
        listingPhotos: photos,
      };

      const realEstateAgent = new RealEstateAgentEntity();

      await realEstateAgent.addPendingProperty(selectedAgent.uid, listingData);

      Swal.fire({
        title: "Success!",
        text: `You property info has been sent to ${selectedAgent.userName} for listing !`,
        icon: "success",
      });
      navigate(-1);
    } catch (err) {
      console.log("Publish Listing failed", err.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
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
                    tags.includes(item.name) ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => handleSelectTags(item.name)}
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
                  {photos.map((photoURL, index) => (
                    <div className="photo" key={index}>
                      <img src={photoURL} alt="Uploaded" />
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
                type="text"
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
            <div
              className="justify-center items-center ml-[23rem] mt-[5rem]"
              style={{
                display: "flex",
                justifyContent: "center",
                width: "50%",
              }}
            >
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
