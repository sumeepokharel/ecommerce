import React from "react";
import {
  FaHome,
  FaPhone,
  FaMailBulk,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import styles from "./Contact.module.css";

const Contact: React.FC = () => {
  return (
    <div className={styles.contactContainer}>
      <div className={styles.contact}>
        <div className={`${styles.contactItem} ${styles.address}`}>
          <FaHome size={20} />
          <div>
            <p>7208 BlackCherry Lane, Mckinney, TX</p>
            <p>USA</p>
          </div>
        </div>

        <div className={`${styles.contactItem} ${styles.phone}`}>
          <FaPhone size={20} />
          <a href="tel:4693256335">
            <h4>469-325-6335</h4>
          </a>
        </div>

        <div className={`${styles.contactItem} ${styles.email}`}>
          <FaMailBulk size={20} />
          <a href="mailto:sumitrapokharel98@gmail.com">
            <h4>sumitrapokharel98@gmail.com</h4>
          </a>
        </div>

        <div className={`${styles.contactItem} ${styles.linkedin}`}>
          <FaLinkedin size={20} />
          <a
            href="https://www.linkedin.com/in/sumitra-pokharel/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            LinkedIn
          </a>
        </div>

        <div className={`${styles.contactItem} ${styles.github}`}>
          <FaGithub size={20} />
          <a
            href="https://github.com/sumeepokharel"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
