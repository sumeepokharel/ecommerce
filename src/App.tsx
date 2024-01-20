import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import Registration from "./pages/Registration";
import HomePage from "./pages/HomePage";
import Cart from "./pages/cart";
import MensSection from "./components/MenSection";
import WomenSection from "./components/womenSection";
import KidsSection from "./components/KidsSection";
import FootWear from "./components/footwerar";
import Groceries from "./components/groceries";
import Footer from "./components/footer/Footer";
import MainPage from "./components/Mainpage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Navbar />
        <MainPage />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/SignUp" element={<Registration />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/Men" element={<MensSection />} />
          <Route path="/women" element={<WomenSection />} />
          <Route path="/kids" element={<KidsSection />} />
          <Route path="/footwear" element={<FootWear />} />
          <Route path="/groceries" element={<Groceries />} />
          <Route path="/about" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route
            path="/cart"
            element={
              <Cart
                productId={0}
                productName={""}
                productDescription={""}
                category={""}
                imageUrl={""}
                productPrice={0}
              />
            }
          />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
