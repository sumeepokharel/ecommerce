import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import LoginPage from "../../pages/loginPage";
import Registration from "../../pages/Registration";
import styles from "./navbar.module.css"; // Import the CSS module
import pic from "../Assets/images/logo_trial.png";
import SearchComponent from "../search";

function Navbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const handleLoginButtonClick = () => {
    setShowLoginModal(true);
  };

  const handleRegistrationButtonClick = () => {
    setShowRegistrationModal(true);
  };

  return (
    <div className={styles["navigation-container"]}>
      <div className={styles["brand-container"]}></div>
      <div className={styles["cart-container"]}>
        <img
          src={pic}
          alt="Shopping Bag"
          className={styles["new-shopping-icon"]}
          style={{ width: "100px", height: "100px" }}
        />
      </div>
      <SearchComponent />

      <ul className={styles["nav-menu"]}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Men">Men</Link>
        </li>
        <li>
          <Link to="/Women">Women</Link>
        </li>
        <li>
          <Link to="/Kids">Kids</Link>
        </li>
        <li>
          <Link to="/Groceries">Groceries</Link>
        </li>
        <li>
          <Link to="/Footwear">Footwear</Link>
        </li>
      </ul>
      <div className={styles["nav-login-cart"]}>
        <button onClick={handleRegistrationButtonClick}>SignUp</button>
        <button onClick={handleLoginButtonClick}>Login</button>
        <Link to="/cart">
          <FaShoppingCart className={styles["shopping-cart-icon"]} />
        </Link>
      </div>

      {showLoginModal && <LoginPage />}
      {showRegistrationModal && <Registration />}
    </div>
  );
}

export default Navbar;
