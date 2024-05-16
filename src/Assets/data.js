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
];
