import React from "react";
import { FaWhatsapp, FaInstagram, FaPinterest } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import styles from "./footer.module.css";
import footer_logo from "../Assets/images/shoppingbag.png";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerLogo}>
        <img src={footer_logo} alt="" />
        <p> SP ONLINE</p>
      </div>
      <ul className={styles.footerLinks}>
        <li>Company</li>

        <li>Offices</li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <div className={styles.socialIcons}>
        <FaWhatsapp className={styles.icon} />
        <FaInstagram className={styles.icon} />
        <FaPinterest className={styles.icon} />
      </div>
      <div className={styles.footercopyright}>
        <hr />
        <p> Copyright 2024- All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
