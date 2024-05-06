import LandingPage from "./Pages/LandingPage/LandingPage";
import SignUpPage from "./Pages/AuthPages/SignUpPage/SignUpPage";
import SignInPage from "./Pages/AuthPages/SignInPage/SignInPage";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";
import BuyerHomePage from "./Pages/HomePages/BuyerHomePage";

const App = () => {
  const { currentUser } = useContext(AuthContext);

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
          path="/buyerHomePage"
          element={
            <ProtectedRoute>
              <BuyerHomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
