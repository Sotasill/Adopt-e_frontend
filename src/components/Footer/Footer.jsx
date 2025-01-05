import styles from "./Footer.module.css";
import Navigation from "../Navigation/Navigation";

const Footer = () => {

  return (
    <>
      <div className={styles.footer}>
        <h1>Footer</h1>
      </div>
      <Navigation />
    </>
  );
};

export default Footer;
