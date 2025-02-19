import styles from "./Layout.module.css";
import Navigation from "../Navigation/Navigation";

const AuthLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navigation />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default AuthLayout; 