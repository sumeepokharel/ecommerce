import React from "react";
import styles from "./About.module.css";

const About: React.FC = () => {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutContent}>
        <h2 className={styles.aboutTitle}>About US</h2>
        <p className={styles.aboutDescription}>Our Ecommerce Store</p>
        <p className={styles.description}></p>
        <p className={styles.aboutDescription}></p>
        <p className={styles.aboutDescription}>
          Thank you For Supporting our small business
        </p>
      </div>
    </div>
  );
};

export default About;
