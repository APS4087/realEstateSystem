import React from "react";
import SoldRental from "./SoldRental";

const SoldRentals = ({ properties }) => {
  // Destructure properties from props
  return (
    <div className="py-3 sm:py-5">
      <div className="grid grid-cols-4 gap-4">
        {properties.map((rental) => (
          <SoldRental
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

export default SoldRentals;
