import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";

import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import Registration from "./pages/Registration";
import Home from "./components/Mainpage";
import HomePage from "./pages/HomePage";
import Cart from "./components/cart";

const App = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <Home />

      <Routes>
        <Route path="/Registration" element={<Registration />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Homepage" element={<HomePage />} />
        <Route
          path="/cart"
          element={
            <Cart
              productId={0}
              productName={""}
              productDescription={""}
              category={""}
              imageUrl={""}
              price={0}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
