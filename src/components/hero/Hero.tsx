import React from "react";
import { FaHandHoldingHeart, FaArrowRight } from "react-icons/fa";
import styles from "./Hero.module.css";
import image from "../Assets/images/redcoat.jpg";

const Hero: React.FC = () => {
  return (
    <div className={styles.hero}>
      <div className={styles["hero-left"]}>
        <div className={styles["hero-content"]}>
          <h2>NEW ARRIVALS</h2>
          <div className={styles["hand-hand-icon"]}>
            <FaHandHoldingHeart className={styles["hand-icon"]} />
            <h2>new</h2>
          </div>
          <h2>Collections</h2>
          <h2>For Everyone</h2>
        </div>
        <div className={styles["hero-latest-btn"]}>
          <div>Latest Collection</div>
          <FaArrowRight className={styles["arrow-icon"]} />
        </div>
      </div>
      <img src={image} alt="" className={styles["hero-image"]} />
    </div>
  );
};

export default Hero;
