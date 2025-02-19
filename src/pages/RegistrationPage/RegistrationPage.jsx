import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import AuthLayout from "../../components/Layout/AuthLayout";
import styles from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  return (
    <AuthLayout>
      <div className={styles.registrationPage}>
        <RegistrationForm />
      </div>
    </AuthLayout>
  );
};

export default RegistrationPage;
