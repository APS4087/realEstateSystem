import house1 from "./house1.png";
import house2 from "./house2.png";
import house3 from "./house3.png";
import {
  TbBeach,
  TbMountain,
  TbPool,
  TbNavigationNorth,
  TbNavigationEast,
  TbNavigationWest,
  TbNavigationCode,
} from "react-icons/tb";
import { FaHouseCircleXmark } from "react-icons/fa6";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import {
  FaSkiing,
  FaPumpSoap,
  FaShower,
  FaFireExtinguisher,
  FaUmbrellaBeach,
  FaKey,
} from "react-icons/fa";
import { FaHouseUser, FaPeopleRoof, FaKitchenSet } from "react-icons/fa6";
import {
  BiSolidWasher,
  BiSolidDryer,
  BiSolidFirstAid,
  BiWifi,
  BiSolidFridge,
  BiWorld,
} from "react-icons/bi";
import {
  BsSnow,
  BsFillDoorOpenFill,
  BsPersonWorkspace,
  BsGlobeCentralSouthAsia,
  BsFillHouseCheckFill,
} from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import {
  MdOutlineVilla,
  MdMicrowave,
  MdBalcony,
  MdYard,
  MdPets,
} from "react-icons/md";
import {
  PiBathtubFill,
  PiCoatHangerFill,
  PiTelevisionFill,
  PiHouseLineFill,
  PiBuildingApartmentFill,
  PiBuildingsBold,
} from "react-icons/pi";
import { TbIroning3 } from "react-icons/tb";
import {
  GiHeatHaze,
  GiCctvCamera,
  GiBarbecue,
  GiToaster,
  GiCampfire,
} from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";

export const categories = [
  {
    label: "All",
    icon: <BiWorld />,
  },
  {
    img: "img/beach_cat.jpg",
    label: "Beachfront",
    icon: <TbBeach />,
    description: "This property is close to the beach!",
  },
  {
    img: "img/windmill_cat.webp",
    label: "Windmills",
    icon: <GiWindmill />,
    description: "This property is has windmills!",
  },
  {
    img: "img/modern_cat.webp",
    label: "Iconic cities",
    icon: <MdOutlineVilla />,
    description: "This property is modern!",
  },
  {
    img: "img/countryside_cat.webp",
    label: "Countryside",
    icon: <TbMountain />,
    description: "This property is in the countryside!",
  },
  {
    img: "img/pool_cat.jpg",
    label: "Amazing Pools",
    icon: <TbPool />,
    description: "This is property has a beautiful pool!",
  },
  {
    img: "img/island_cat.webp",
    label: "Islands",
    icon: <GiIsland />,
    description: "This property is on an island!",
  },
  {
    img: "img/lake_cat.webp",
    label: "Lakefront",
    icon: <GiBoatFishing />,
    description: "This property is near a lake!",
  },
  {
    img: "img/skiing_cat.jpg",
    label: "Ski-in/out",
    icon: <FaSkiing />,
    description: "This property has skiing activies!",
  },
  {
    img: "img/castle_cat.webp",
    label: "Castles",
    icon: <GiCastle />,
    description: "This property is an ancient castle!",
  },
  {
    img: "img/cave_cat.jpg",
    label: "Caves",
    icon: <GiCaveEntrance />,
    description: "This property is in a spooky cave!",
  },
  {
    img: "img/camping_cat.jpg",
    label: "Camping",
    icon: <GiForestCamp />,
    description: "This property offers camping activities!",
  },
  {
    img: "img/arctic_cat.webp",
    label: "Arctic",
    icon: <BsSnow />,
    description: "This property is in arctic environment!",
  },
  {
    img: "img/desert_cat.webp",
    label: "Desert",
    icon: <GiCactus />,
    description: "This property is in the desert!",
  },
  {
    img: "img/barn_cat.jpg",
    label: "Barns",
    icon: <GiBarn />,
    description: "This property is in a barn!",
  },
  {
    img: "img/lux_cat.jpg",
    label: "Luxury",
    icon: <IoDiamond />,
    description: "This property is brand new and luxurious!",
  },
];

export const types = [
  {
    name: "An entire place",
    description: "Guests have the whole place to themselves",
    icon: <FaHouseUser />,
  },
  {
    name: "Room(s)",
    description:
      "Guests have their own room in a house, plus access to shared places",
    icon: <BsFillDoorOpenFill />,
  },
  {
    name: "A Shared Room",
    description:
      "Guests sleep in a room or common area that maybe shared with you or others",
    icon: <FaPeopleRoof />,
  },
];

export const facilities = [
  {
    name: "Central Area",
    icon: <BsGlobeCentralSouthAsia />,
  },
  {
    name: "North Area",
    icon: <TbNavigationNorth />,
  },
  {
    name: "East Area",
    icon: <TbNavigationEast />,
  },
  {
    name: "West Area",
    icon: <TbNavigationWest />,
  },
  {
    name: "North-east Area",
    icon: <TbNavigationCode />,
  },
  {
    name: "Landed Property",
    icon: <PiHouseLineFill />,
  },
  {
    name: "HDB",
    icon: <PiBuildingApartmentFill />,
  },
  {
    name: "Condominium",
    icon: <PiBuildingsBold />,
  },
  {
    name: "Available Property",
    icon: <BsFillHouseCheckFill />,
  },
  {
    name: "Unavailabe Property",
    icon: <FaHouseCircleXmark />,
  },
];

export const rentalsData = [
  {
    id: "rental001",
    title: "Texas Ranch Retreat",
    listingPhotos: [house1, house2, house3],
    price: "1,620,000",
    description: "A nice abode",
    tags: ["Available", "Condominium", "Central Singapore"],
    viewCount: 25,
    shortCount: 10,
  },
  {
    id: "rental002",
    title: "Modern Urban Oasis in Texas",
    listingPhotos: [house1, house2, house3],
    price: "980,000",
    description: "Discover the perfect urban escape.",
    tags: ["Available", "Condominium", "Central Singapore"],
    viewCount: 25,
    shortCount: 10,
  },
  {
    id: "rental003",
    title: "Luxury Lakeside Estate",
    listingPhotos: [house1, house2, house3],
    price: "3,750,000",
    description: "Experience the pinnacle of lakeside living.",
    tags: ["Available", "Condominium", "Central Singapore"],
    viewCount: 25,
    shortCount: 10,
  },
  {
    id: "rental004",
    title: "Historic Southern Charm",
    listingPhotos: [house1, house2, house3],
    price: "675,000",
    description: "Step into a piece of Southern history.",
    tags: ["Available", "Condominium", "Central Singapore"],
    viewCount: 25,
    shortCount: 10,
  },
  {
    id: "rental005",
    title: "Contemporary Hill Country Home",
    listingPhotos: [house1, house2, house3],
    price: "1,200,000",
    description: "Embrace modern living in the heart of the hill country.",
    tags: ["Available", "Condominium", "Central Singapore"],
    viewCount: 25,
    shortCount: 10,
  },
  {
    id: "rental006",
    title: "Rustic Texas Retreat",
    listingPhotos: [house1, house2, house3],
    price: "850,000",
    description: "Find serenity in a rustic retreat.",
    tags: ["Available", "Condominium", "Central Singapore"],
    viewCount: 25,
    shortCount: 10,
  },
  {
    id: "rental007",
    title: "Family-Friendly Suburban Living",
    listingPhotos: [house1, house2, house3],
    price: "450,000",
    description: "Ideal for families seeking suburban comfort.",
    tags: ["Available", "Condominium", "Central Singapore"],
    viewCount: 25,
    shortCount: 10,
  },
  {
    id: "rental008",
    title: "Chic Downtown Loft",
    listingPhotos: [house1, house2, house3],
    price: "725,000",
    description: "Live in style in a chic downtown loft.",
    tags: ["Available", "Condominium", "Central Singapore"],
    viewCount: 25,
    shortCount: 10,
  },
  {
    id: "rental009",
    title: "Secluded Texas Hideaway",
    listingPhotos: [house1, house2, house3],
    price: "1,950,000",
    description: "Escape to your own private hideaway.",
    tags: ["Available", "Condominium", "Central Singapore"],
    viewCount: 25,
    shortCount: 10,
  },
  {
    id: "rental010",
    title: "Golf Course Living",
    listingPhotos: [house1, house2, house3],
    price: "1,150,000",
    description: "Experience luxury living on the golf course.",
    tags: ["Available", "Condominium", "Central Singapore"],
    viewCount: 25,
    shortCount: 10,
  },
  {
    id: "rental011",
    title: "Hilltop Mansion with Panoramic Views",
    listingPhotos: [house1, house2, house3],
    price: "5,500,000",
    description: "Enjoy breathtaking views from your hilltop mansion.",
    tags: ["Available", "Condominium", "Central Singapore"],
    viewCount: 25,
    shortCount: 10,
  },
  {
    id: "rental012",
    title: "Quaint Historic Cottage",
    listingPhotos: [house1, house2, house3],
    price: "375,000",
    description: "Step back in time in a charming historic cottage.",
    tags: ["Available", "Condominium", "Central Singapore"],
    viewCount: 25,
    shortCount: 10,
  },
  {
    id: "rental013",
    title: "Lakefront Cabin Retreat",
    listingPhotos: [house1, house2, house3],
    price: "550,000",
    description: "Relax by the lake in your own private cabin.",
    tags: ["Available", "Condominium", "Central Singapore"],
    viewCount: 25,
    shortCount: 10,
  },
  {
    id: "rental014",
    title: "Luxury High-Rise Living",
    listingPhotos: [house1, house2, house3],
    price: "2,800,000",
    description: "Experience luxury living in the sky.",
    tags: ["Available", "Condominium", "Central Singapore"],
    viewCount: 25,
    shortCount: 10,
  },
  {
    id: "rental015",
    title: "Charming Victorian Home",
    listingPhotos: [house1, house2, house3],
    price: "725,000",
    description: "Step into the charm of a Victorian era home.",
    tags: ["Available", "Condominium", "Central Singapore"],
    viewCount: 25,
    shortCount: 10,
  },
  {
    id: "rental016",
    title: "Spacious Suburban Estate",
    listingPhotos: [house1, house2, house3],
    price: "1,350,000",
    description: "Find space and luxury in a suburban estate.",
    tags: ["Available", "Condominium", "Central Singapore"],
    viewCount: 25,
    shortCount: 10,
  },
  {
    id: "rental017",
    title: "Texas Hill Country Paradise",
    listingPhotos: [house1, house2, house3],
    price: "2,250,000",
    description:
      "Discover your own piece of paradise in the Texas hill country.",
    tags: ["Available", "Condominium", "Central Singapore"],
    viewCount: 25,
    shortCount: 10,
  },
  {
    id: "rental018",
    title: "Cozy Bungalow in the Heart of Texas",
    listingPhotos: [house1, house2, house3],
    price: "425,000",
    description: "Cozy up in a bungalow nestled in the heart of Texas.",
    tags: ["Available", "Condominium", "Central Singapore"],
    viewCount: 25,
    shortCount: 10,
  },
  {
    id: "rental019",
    title: "Modern Farmhouse Retreat",
    listingPhotos: [house1, house2, house3],
    price: "1,100,000",
    description: "Escape to a modern farmhouse retreat.",
    tags: ["Available", "Condominium", "Central Singapore"],
    viewCount: 25,
    shortCount: 10,
  },
  {
    id: "rental020",
    title: "Ranch-style Living with Acreage",
    listingPhotos: [house1, house2, house3],
    price: "950,000",
    description:
      "Experience the freedom of ranch-style living with ample acreage.",
    tags: ["Available", "Condominium", "Central Singapore"],
    viewCount: 25,
    shortCount: 10,
  },
];
