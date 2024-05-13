import LandingPage from "./Pages/LandingPage/LandingPage";
import SignUpPage from "./Pages/AuthPages/SignUpPage/SignUpPage";
import SignInPage from "./Pages/AuthPages/SignInPage/SignInPage";
import { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";
import BuyerHomePage from "./Pages/HomePages/BuyerHomePage";
import RealEsateAgentHomePage from "./Pages/HomePages/RealEsateAgentHomePage";
import SellerHomePage from "./Pages/HomePages/SellerHomePage";
import SystemAdminHomePage from "./Pages/HomePages/SystemAdminHomePage";
import CreateListingPage from "./Pages/AdditionalPages/createListingPage";
import PListPage from "./Pages/AdditionalPages/PListPage";
import PendingPropertiesPage from "./Pages/AdditionalPages/RealEsateAgentPages/PendingPropertiesPage";
import PendingPropertyListPage from "./Pages/AdditionalPages/RealEsateAgentPages/PendingPropertyListPage";
import BoughtPropertiesPage from "./Pages/AdditionalPages/BuyerPages/BoughtProperties";
import UserProfileUpdate from "./Pages/AdditionalPages/UserProfileUpdate";

const App = () => {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    console.log("Current User: ", currentUser);
  }, [currentUser]);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/signin" />;
    }
    return children;
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route
          path="/profileUpdatePage"
          element={
            <ProtectedRoute>
              <UserProfileUpdate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buyerHomePage"
          element={
            <ProtectedRoute>
              <BuyerHomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/boughtPropertiesPage"
          element={
            <ProtectedRoute>
              <BoughtPropertiesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sellerHomePage"
          element={
            <ProtectedRoute>
              <SellerHomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createListingPage"
          element={
            <ProtectedRoute>
              <CreateListingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/realEstateAgentHomePage"
          element={
            <ProtectedRoute>
              <RealEsateAgentHomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pendingPropertiesPage"
          element={
            <ProtectedRoute>
              <PendingPropertiesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/systemAdminHomePage"
          element={
            <ProtectedRoute>
              <SystemAdminHomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/property/:Id" element={<PListPage />} />

        <Route
          path="/pendingProperty/:Id"
          element={
            <ProtectedRoute>
              <PendingPropertyListPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
