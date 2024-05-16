import "../../../Styles/CreateListing.scss";
import Header from "../../../Components/Header";
import { categories, types, facilities } from "../../../Assets/data";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import variables from "../../../Styles/variables.scss";
import { IoIosImages } from "react-icons/io";
import { useState, useEffect } from "react";
import { BiTrash } from "react-icons/bi";
import { storage, db } from "../../../Backend/Firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import Swal from "sweetalert2";
import UpdatePropertyController from "../../../Controllers/PropertyControllers/UpdatePropertyController";

import { useParams } from "react-router-dom";

import RealEstateAgentController from "../../../Controllers/AgentControllers/realEsateAgentController";
import ViewPropertyController from "../../../Controllers/PropertyControllers/ViewPropertyController";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const UpdateListingPage = () => {
  const navigate = useNavigate();
  const { Id } = useParams(); // Retrieve the rental ID from the URL
  const { currentUser } = useContext(AuthContext);
  const [category, setCategory] = useState("");
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [agentData, setAgentData] = useState(""); // State to store the agent data
  /* BASIC COUNTS */
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [sellerId, setSellerId] = useState("");

  /* UPLOAD, DRAG & DROP, REMOVE PHOTOS */
  const [photos, setPhotos] = useState([]);
  // Initialize formDescription and formLocation with empty values
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    price: 0,
  });
  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
  });

  /* AMENITIES */
  const [tags, setTags] = useState([]);

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
  // Update formDescription and formLocation when rental data becomes available
  useEffect(() => {
    if (rental) {
      setFormDescription({
        title: rental.title,
        description: rental.description,
        price: rental.price,
      });
      setFormLocation({
        streetAddress: rental.streetAddress,
        aptSuite: rental.aptSuite,
        city: rental.city,
        province: rental.province,
        country: rental.country,
      });
      setPhotos(rental.listingPhotos);
      setCategory(rental.category);
      setBathroomCount(rental.bathroomCount);
      setBedroomCount(rental.bedroomCount);
      setSelectedAgent(rental.agentID);
      setSellerId(rental.sellerId);
      setTags(rental.tags);
    }
  }, [rental]);

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

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };

  const handleSelectTags = (tag) => {
    if (tags.includes(tag)) {
      setTags((prevTag) => prevTag.filter((option) => option !== tag));
    } else {
      setTags((prev) => [...prev, tag]);
    }
  };

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

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };

  const handlePost = async (e) => {
    e.preventDefault();

    // TODO: CHANGE TO BCE STRUCTURE
    try {
      /* Create a new object to handle data */
      const newlistingData = {
        id: Id,
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

      const updatePropertyController = new UpdatePropertyController();

      // Call the updateProperty method of the controller
      await updatePropertyController.updateProperty(Id, newlistingData);

      Swal.fire({
        title: "Success!",
        text: `The Property has been Updated !`,
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
          Update{" "}
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Property Listing !
          </span>
        </h1>

        <form onSubmit={handlePost}>
          <div className="create-listing_step1">
            <h2 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
              Step 1: Update the Categories
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
              Update Location of property
            </h3>
            <div className="full">
              <div className="location">
                <p>Street Address</p>
                <input
                  type="text"
                  placeholder={rental.streetAddress}
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
                  placeholder={rental.aptSuite}
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
                  placeholder={rental.city}
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
                  placeholder={rental.province}
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
                  placeholder={rental.country}
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

            <h3 class="text-2xl font-bold dark:text-white">Update Tags</h3>
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
                placeholder={rental.title}
                name="title"
                value={formDescription.title}
                onChange={handleChangeDescription}
                required
              />
              <p>Description</p>
              <textarea
                type="text"
                placeholder={rental.description}
                name="description"
                value={formDescription.description}
                onChange={handleChangeDescription}
                required
              />

              <p>Now, set your PRICE</p>
              <span>S$</span>
              <input
                type="text"
                placeholder={rental.price}
                name="price"
                value={formDescription.price}
                onChange={handleChangeDescription}
                className="price"
                required
              />
            </div>
          </div>

          <button className="submit_btn" type="submit">
            Update Listing
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateListingPage;
