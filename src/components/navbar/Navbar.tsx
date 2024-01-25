import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import LoginPage from "../../pages/loginPage";
import Registration from "../../pages/Registration";
import styles from "./navbar.module.css";
import pic from "../Assets/images/logo_trial.png";
import SearchComponent from "../search";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { RootState } from "../../redux/store";

interface State {
  auth: {
    username: string | null;
  };
}

function Navbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const cartCount = useSelector((state: RootState) => state.cart.itemQuantity);
  const handleLoginButtonClick = () => {
    setShowLoginModal(true);
  };

  const handleRegistrationButtonClick = () => {
    setShowRegistrationModal(true);
  };

  // Access the logged-in username from Redux state
  const loggedInUsername = useSelector((state: State) => state.auth.username);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());
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
        <li>
          <Link to="/Wishlist">Wishlist</Link>
        </li>
      </ul>
      <div className={styles["nav-login-cart"]}>
        {/* Display username if logged in */}
        {loggedInUsername ? (
          <>
            <p>Welcome, {loggedInUsername}!</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={handleRegistrationButtonClick}>SignUp</button>
            <button onClick={handleLoginButtonClick}>Login</button>
          </>
        )}
        <Link to="/cart" className={styles["cart-link"]}>
          <FaShoppingCart className={styles["shopping-cart-icon"]} />
          <span className={styles["cart-count"]}>{cartCount}</span>
        </Link>
      </div>

      {showLoginModal && <LoginPage />}
      {showRegistrationModal && <Registration />}
    </div>
  );
}

export default Navbar;
