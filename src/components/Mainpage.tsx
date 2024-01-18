import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import MenSection from "./MenSection";
import WomenSection from "./womenSection";
import KidsSection from "./KidsSection";
import FootWear from "./footwerar";
import styles from "./Main.module.css";
import HomePage from "../pages/HomePage";
import Groceries from "./groceries";
import Newsletter from "./newletter/Newsletter";

export default function Home() {
  return (
    <>
      <main>
        <HomePage />
        <KidsSection />
        <MenSection />
        <FootWear />
        <Groceries />
        <Newsletter />
        <Footer />
      </main>
    </>
  );
}
