import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/HomePage";
import Shop from "./pages/ShopPage";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import Registration from "./pages/Registration";

const App = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <Shop />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/Registration" element={<Registration />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
