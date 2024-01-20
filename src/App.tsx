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
import Wishlist from "./components/wishlist/wishlist";
import ProductDetailPage from "./components/products/productdetail";
import Products from "./components/products/Products";

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
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/Men" element={<MensSection />} />
          <Route path="/Women" element={<WomenSection />} />
          <Route path="/Kids" element={<KidsSection />} />
          <Route path="/Footwear" element={<FootWear />} />
          <Route path="/Groceries" element={<Groceries />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Cart" element={<Cart productId={0} />} />
          <Route path="/Contact" element={<Wishlist />} />
          <Route path="/Checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
