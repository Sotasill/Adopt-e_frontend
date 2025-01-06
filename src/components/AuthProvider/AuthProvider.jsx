import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "../../redux/auth/authActions";
import { jwtDecode } from "jwt-decode";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Current token:", token);

    if (token) {
      try {
        // Декодируем токен для получения данных пользователя
        const decodedToken = jwtDecode(token);
        console.log("Decoded token (full):", decodedToken);

        // Пытаемся найти данные пользователя в разных местах токена
        let userData = null;
        if (decodedToken.user) {
          console.log("Found user in decodedToken.user:", decodedToken.user);
          userData = decodedToken.user;
        } else if (decodedToken.data) {
          console.log("Found user in decodedToken.data:", decodedToken.data);
          userData = decodedToken.data;
        } else {
          console.log("Using token data directly");
          // Если нет специального поля, используем сам токен
          userData = {
            id: decodedToken.id || decodedToken._id,
            username: decodedToken.username,
            email: decodedToken.email,
            role: decodedToken.role || decodedToken.userType || "user",
          };
        }

        console.log("Final extracted user data:", userData);

        if (!userData || !userData.role) {
          console.error("Missing required user data:", userData);
          throw new Error("Не удалось получить данные пользователя из токена");
        }

        console.log("Setting user data in Redux:", userData);
        // Устанавливаем данные пользователя в Redux
        dispatch(setUser(userData));
        dispatch(setAuth(true));
      } catch (error) {
        console.error("Detailed error when decoding token:", error);
        localStorage.removeItem("token");
        dispatch(setAuth(false));
        dispatch(setUser(null));
      }
    } else {
      console.log("No token found in localStorage");
    }
  }, [dispatch]);

  return children;
};

export default AuthProvider;
