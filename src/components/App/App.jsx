import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../redux/auth/authActions";
import PropTypes from "prop-types";
import Layout from "../Layout/Layout";
import HomePage from "../../pages/HomePage/HomePage";
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage";
import LoginForm from "../LoginForm/LoginForm";
import MainBCS from "../../pages/MainBCS/MainBCS";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  return isAuthenticated || token ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setAuth(true));
    }
  }, [dispatch]);

  return (
    <Layout>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/MainBCS"
            element={
              <PrivateRoute>
                <MainBCS />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Layout>
  );
};

export default App;
