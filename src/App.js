import LandingPage from "./Pages/LandingPage/LandingPage";
import SignUpPage from "./Pages/AuthPages/SignUpPage/SignUpPage";
import SignInPage from "./Pages/AuthPages/SignInPage/SignInPage";
import { useContext, useEffect, useState } from "react";
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
import ListedAgentPropertiesPage from "./Pages/AdditionalPages/RealEsateAgentPages/ListedAgentPropertiesPage";
import SavedPropertiesPage from "./Pages/AdditionalPages/BuyerPages/SavedPropertiesPage";
import SellerListedPropertiesPage from "./Pages/AdditionalPages/SellerPages/SellerListedPropertiesPage";
import SellerSoldPropertiesPage from "./Pages/AdditionalPages/SellerPages/SellerSoldPropertiesPage";
import SellerSoldPropertiesListPage from "./Pages/AdditionalPages/SellerPages/SellerSoldPropertiesListPage";
import AgentListedPropertiesDetails from "./Pages/AdditionalPages/RealEsateAgentPages/AgentListedPropertiesDetails";
import UpdateListingPage from "./Pages/AdditionalPages/RealEsateAgentPages/UpdateListingPage";
import SearchPropertyPage from "./Pages/AdditionalPages/SearchPropertyPage";
import ViewReviewsPage from "./Pages/AdditionalPages/ViewReviewsPage";
import AdminUserAccountPage from "./Pages/AdditionalPages/AdminPages/AdminUserAccountPage";
import AdminUserProfilePage from "./Pages/AdditionalPages/AdminPages/AdminUserProfilePage";
import CreateUserAccoutPage from "./Pages/AdditionalPages/AdminPages/CreateUserAccoutPage";
import ViewUserAccountPage from "./Pages/AdditionalPages/AdminPages/ViewUserAccountPage";
import SearchUserAccountPage from "./Pages/AdditionalPages/AdminPages/SearchUserAccountPage";
import SuspendUserAccountPage from "./Pages/AdditionalPages/AdminPages/SuspendUserAccountPage";
import CreateUserProfilePage from "./Pages/AdditionalPages/AdminPages/CreateUserProfilePage";
import SearchUserProfilePage from "./Pages/AdditionalPages/AdminPages/SearchUserProfilePage";
import SuspendUserProfilePage from "./Pages/AdditionalPages/AdminPages/SuspendUserProfilePage";
import ViewUserProfilePage from "./Pages/AdditionalPages/AdminPages/ViewUserProfilePage";
import LoadingAnimation from "./Components/LoadingAnimation";
import AdminUpdateAccountPage from "./Pages/AdditionalPages/AdminPages/AdminUpdateAccountPage";

const App = () => {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 3500);
  }, []);
  if (loading) {
    return <LoadingAnimation />;
  }

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
          path="/agentPropertiesListedPage"
          element={
            <ProtectedRoute>
              <ListedAgentPropertiesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminUserAccountPage"
          element={
            <ProtectedRoute>
              <AdminUserAccountPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminCreateUserAccountPage"
          element={
            <ProtectedRoute>
              <CreateUserAccoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminCreateUserProfilePage"
          element={
            <ProtectedRoute>
              <CreateUserProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/adminViewUserAccountPage"
          element={
            <ProtectedRoute>
              <ViewUserAccountPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminViewUserProfilePage"
          element={
            <ProtectedRoute>
              <ViewUserProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminSearchUserAccountPage"
          element={
            <ProtectedRoute>
              <SearchUserAccountPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminSearchUserProfilPage"
          element={
            <ProtectedRoute>
              <SearchUserProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminSuspendUserAccountPage"
          element={
            <ProtectedRoute>
              <SuspendUserAccountPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminSuspendUserProfilePage"
          element={
            <ProtectedRoute>
              <SuspendUserProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminUserProfilePage"
          element={
            <ProtectedRoute>
              <AdminUserProfilePage />
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
          path="/savedPropertiesPage"
          element={
            <ProtectedRoute>
              <SavedPropertiesPage />
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
          path="/sellerSoldPropertiesPage"
          element={
            <ProtectedRoute>
              <SellerSoldPropertiesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sellerListedPropertiesPage"
          element={
            <ProtectedRoute>
              <SellerListedPropertiesPage />
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
        <Route path="/searchPropertyPage" element={<SearchPropertyPage />} />
        <Route path="/viewReviewsPage/:Id" element={<ViewReviewsPage />} />
        <Route
          path="/pendingProperty/:Id"
          element={
            <ProtectedRoute>
              <PendingPropertyListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminUpdateAccount/:Id"
          element={
            <ProtectedRoute>
              <AdminUpdateAccountPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/soldProperty/:Id"
          element={
            <ProtectedRoute>
              <SellerSoldPropertiesListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updatePropertyDetail/:Id"
          element={
            <ProtectedRoute>
              <AgentListedPropertiesDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/updateListingPage/:Id"
          element={
            <ProtectedRoute>
              <UpdateListingPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
