import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import MenSection from "./MenSection";
import WomenSection from "./womenSection";
import KidsSection from "./KidsSection";

import image1 from "../../src/components/Assets/images/redcoat.jpg";
import image2 from "../../src/components/Assets/images/pexels-musaab-zayona-19289550.jpg";
import styles from "./Main.module.css";
import HomePage from "../pages/HomePage";

export default function Home() {
  return (
    <>
      <main>
        <div
          className={`${styles.imageContainer} flex flex-col items-center z-10`}
        >
          <div className={`relative ${styles.imageWrapper}`}>
            <img
              src={image1}
              alt="Image 1"
              className={`${styles.image} w-full`}
            />
            <div className="absolute top-1/2 right-0 transform translate-y-1/2 text-white text-center">
              {/* Your content goes here */}
            </div>
          </div>

          <div className={`relative ${styles.imageWrapper}`}>
            <img
              src={image2}
              alt="Image 2"
              className={`${styles.image} w-full`}
            />
          </div>
        </div>
        <HomePage />
        <MenSection />
        <WomenSection />
        <KidsSection />
        <Footer />
      </main>
    </>
  );
}
