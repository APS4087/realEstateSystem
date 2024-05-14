import React from "react";
import UpdateRental from "./UpdateRental";

const UpdateRentals = ({ properties }) => {
  // Destructure properties from props
  return (
    <div className="py-3 sm:py-5">
      <div className="grid grid-cols-4 gap-4">
        {properties.map((rental) => (
          <UpdateRental
            Id={rental.id}
            title={rental.title}
            image={rental.listingPhotos[0]}
            price={rental.price}
            views={rental.viewCount || 0}
            tag={rental.tags[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default UpdateRentals;