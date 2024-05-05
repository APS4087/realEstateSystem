import React from "react";
import house1 from "../../Assets/house1.png";
import Rental from "./Rental";

const Rentals = () => {
  const rentals = [
    { title: "Singapore", image: house1, price: "2,500,000" },
    { title: "Singapore", image: house1, price: "1,800,000" },
    { title: "Singapore", image: house1, price: "3,200,000" },
    { title: "Singapore", image: house1, price: "2,100,000" },
    { title: "Singapore", image: house1, price: "2,700,000" },
    { title: "Singapore", image: house1, price: "1,900,000" },
    { title: "Singapore", image: house1, price: "4,000,000" },
    { title: "Singapore", image: house1, price: "3,500,000" },
    { title: "Singapore", image: house1, price: "2,300,000" },
    { title: "Singapore", image: house1, price: "2,800,000" },
    { title: "Singapore", image: house1, price: "2,600,000" },
    { title: "Singapore", image: house1, price: "3,600,000" },
    { title: "Singapore", image: house1, price: "3,100,000" },
    { title: "Singapore", image: house1, price: "2,400,000" },
    { title: "Singapore", image: house1, price: "2,200,000" },
    { title: "Singapore", image: house1, price: "3,300,000" },
    { title: "Singapore", image: house1, price: "1,700,000" },
    { title: "Singapore", image: house1, price: "2,900,000" },
    { title: "Singapore", image: house1, price: "3,800,000" },
    { title: "Singapore", image: house1, price: "2,000,000" },
  ];
  return (
    <div className="py-3 sm:py-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {rentals.map((rental) => (
          <Rental
            title={rental.title}
            image={rental.image}
            price={rental.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Rentals;
