import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "../../redux/auth/authActions";
import { jwtDecode } from "jwt-decode";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (!token) {
        dispatch(setAuth(false));
        dispatch(setUser(null));
        return;
      }

      try {
        let userData = null;
        if (storedUser) {
          userData = JSON.parse(storedUser);
        }

        if (!userData) {
          const decodedToken = jwtDecode(token);
          userData = decodedToken.data || decodedToken;
        }

        if (!userData || !userData.role) {
          throw new Error("Не удалось получить данные пользователя");
        }

        userData.role = userData.role.toLowerCase();
        localStorage.setItem("user", JSON.stringify(userData));

        dispatch(setUser(userData));
        dispatch(setAuth(true));
      } catch  {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(setAuth(false));
        dispatch(setUser(null));
      }
    };

    initializeAuth();
  }, [dispatch]);

  return children;
};

export default AuthProvider;
