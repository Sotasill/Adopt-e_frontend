import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginForm from "../../components/LoginForm/LoginForm";
import { useEffect } from 'react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/MainBCS');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '0 auto', 
      padding: '20px',
      textAlign: 'center' 
    }}>
      <h2>Войти в аккаунт</h2>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
