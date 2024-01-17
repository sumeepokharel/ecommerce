import styles from "./Newsletter.module.css";

const Newsletter = () => {
  return (
    <div className={styles.NewsLetter}>
      <h1>Get Exclusive Offers on Your Email</h1>
      <p>Subscribe to our Newsletter and Stay Updated</p>
      <div>
        <input type="email" placeholder="Your Email ID" />
        <button>Subscribe</button>
      </div>
    </div>
  );
};

export default Newsletter;
