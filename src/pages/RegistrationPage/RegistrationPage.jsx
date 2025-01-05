import RegistrationSelector from "../../components/RegistrationSelector/RegistrationSelector";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

const RegistrationPage = () => {
  return (
    <div>
      <RegistrationSelector /> {/* Выбор роли */}
      <RegistrationForm /> {/* Форма регистрации */}
    </div>
  );
};

export default RegistrationPage;
