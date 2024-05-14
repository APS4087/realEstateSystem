import { useState } from "react";
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";
import React from "react";
import "../Styles/Carousel.scss";
import { useEffect } from "react";

const ReviewCarousel = ({ children }) => {
  const [active, setActive] = useState(1);
  const count = React.Children.count(children);
  const MAX_VISIBILITY = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prevActive) => (prevActive + 1) % count);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, [count]);

  return (
    <div className="carousel">
      {active > 0 && (
        <button
          className="nav left"
          type="button"
          onClick={() => setActive((i) => i - 1)}
        >
          <TiChevronLeftOutline />
        </button>
      )}
      {React.Children.map(children, (child, i) => (
        <div
          className="card-container"
          style={{
            "--active": i === active ? 1 : 0,
            "--offset": (active - i) / 3,
            "--direction": Math.sign(active - i),
            "--abs-offset": Math.abs(active - i) / 3,
            "pointer-events": active === i ? "auto" : "none",
            opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
            display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
          }}
        >
          {child}
        </div>
      ))}
      {active < count - 1 && (
        <button
          className="nav right"
          type="button"
          onClick={() => setActive((i) => i + 1)}
        >
          <TiChevronRightOutline />
        </button>
      )}
    </div>
  );
};

export default ReviewCarousel;
