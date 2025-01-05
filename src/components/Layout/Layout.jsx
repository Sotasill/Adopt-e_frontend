
import styles from "./Layout.module.css";
import HeaderBar from "../HeaderBar/HeaderBar";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <HeaderBar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
