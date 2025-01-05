
import styles from "./Layout.module.css";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navigation />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
