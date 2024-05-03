import LandingPage from "./Pages/LandingPage/LandingPage";
import SignUpPage from "./Pages/AuthPages/SignUpPage/SignUpPage";

import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
};

export default App;
