import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/register');
  };

  const handleLogIn = () => {
    navigate('/login');
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to Adopt-e</h1>
      <p>Your go-to platform for connecting breeders and pet lovers!</p>
      <div style={{ marginTop: "20px" }}>
        <button 
          onClick={handleLogIn}
          style={{ margin: "10px", padding: "10px 20px" }}
        >
          Log In
        </button>
        <button 
          onClick={handleSignUp}
          style={{ margin: "10px", padding: "10px 20px" }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default HomePage;
