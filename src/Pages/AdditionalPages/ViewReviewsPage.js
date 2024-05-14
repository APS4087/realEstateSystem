import React from "react";
import Header from "../../Components/Header";
import Filter from "../../Components/Filter";
import { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import avatar from "../../Assets/profile.png";
import ReviewCarousel from "../../Utils/ReviewCarousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import RealEstateAgentController from "../../Controllers/AgentControllers/realEsateAgentController";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ViewReviewController from "../../Controllers/AgentControllers/ViewReviewController";
import { useParams } from "react-router-dom";
import realEstateAgent from "../../Components/Cards/RealEstateCards/realEstateAgent";
import GetReviewerDataController from "../../Controllers/ReviewControllers/GetReviewerDataController";

const ViewReviewsPage = () => {
  const { Id } = useParams();
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [agentData, setAgentData] = useState(null);
  const [agentReviews, setAgentReviews] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [reviewerData, setReviewerData] = useState(null);

  const viewReviewController = new ViewReviewController();
  const realEstateAgentController = new RealEstateAgentController();
  const getReviewerDataController = new GetReviewerDataController();

  useEffect(() => {
    const fetchReviews = async () => {
      const agentData = await realEstateAgentController.getAgentData(Id);
      const reviews = await viewReviewController.getReviews(Id);

      const reviewsWithReviewerData = await Promise.all(
        reviews.map(async (review) => {
          const reviewerData = await getReviewerDataController.getUserData(
            review.reviewerId
          );
          return { ...review, reviewerData };
        })
      );

      setAgentReviews(reviewsWithReviewerData);
      setAgentData(agentData);
      setIsLoading(false);
    };

    fetchReviews();
  }, []);

  const Card = ({ title, rating, review, profilePic }) => (
    <div className="card">
      <Avatar
        alt="Profile Picture"
        src={profilePic || avatar}
        style={{ margin: "0 auto", width: "100px", height: "100px" }}
      />
      <h2>{title}</h2>
      <p>Rating: {rating}</p>
      <p>Review: {review}</p>
    </div>
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="App">
      <Header />
      <Filter
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      <div>
        <Box sx={{ padding: 2, margin: "auto", maxWidth: 500 }}>
          <br />
          <Typography
            sx={{
              fontSize: 24,
              textAlign: "center",
              marginBottom: 2,
              fontWeight: "bold",
            }}
            variant="h3"
          >
            Agent Reviews for {agentData.userName}
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {agentReviews ? (
              <ReviewCarousel>
                {agentReviews &&
                  agentReviews.map((review, i) => (
                    <Card
                      key={i}
                      profilePic={review.reviewerData.profilePicture}
                      title={review.reviewerData.userName}
                      rating={review.rating}
                      review={review.review}
                    />
                  ))}
              </ReviewCarousel>
            ) : (
              <Typography variant="h6">The agent has no reviews</Typography>
            )}
          </div>
        </Box>
      </div>
    </div>
  );
};

export default ViewReviewsPage;
