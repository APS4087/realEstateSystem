import React from "react";
import house1 from "../../Assets/house1.png";
import house2 from "../../Assets/house2.png";
import house3 from "../../Assets/house3.png";
import Rental from "./Rental";

const Rentals = ({ properties }) => {
  // Destructure properties from props
  return (
    <div className="py-3 sm:py-5">
      <div className="grid grid-cols-4 gap-4">
        {properties.map((rental) => (
          <Rental
            Id={rental.id}
            title={rental.title}
            image={rental.listingPhotos[0]}
            price={rental.price}
            views={rental.viewCount || 0}
            tag={
              rental.tags.includes("Sold Property")
                ? "Sold Property"
                : "Available Property"
            }
          />
        ))}
      </div>
    </div>
  );
};

export { Rentals };
