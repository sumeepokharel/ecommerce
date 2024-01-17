import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";

import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import Registration from "./pages/Registration";
import Home from "./components/Mainpage";

const App = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <Home />

      <Routes>
        <Route path="/Registration" element={<Registration />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
