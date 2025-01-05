import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/auth/authActions";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setAuth(true));
    }
  }, []);

  return children;
};

export default AuthProvider;
