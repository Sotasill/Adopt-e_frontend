import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "../../redux/auth/authActions";
import { jwtDecode } from "jwt-decode";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (!token || !storedUser) {
          console.log("Нет сохраненных данных аутентификации");
          dispatch(setAuth(false));
          dispatch(setUser(null));
          return;
        }

        // Проверяем токен
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp && decodedToken.exp < currentTime) {
            throw new Error("Токен истек");
          }
        } catch (error) {
          console.error("Ошибка при проверке токена:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          dispatch(setAuth(false));
          dispatch(setUser(null));
          return;
        }

        // Парсим данные пользователя
        try {
          const userData = JSON.parse(storedUser);

          if (!userData || !userData.role) {
            throw new Error("Некорректные данные пользователя");
          }

          // Нормализуем роль
          userData.role = userData.role.toLowerCase();

          console.log("Инициализация данных пользователя:", {
            username: userData.username,
            role: userData.role,
            specialization: userData.specialization,
          });

          dispatch(setUser(userData));
          dispatch(setAuth(true));
        } catch (error) {
          console.error("Ошибка при парсинге данных пользователя:", error);
          localStorage.removeItem("user");
          dispatch(setAuth(false));
          dispatch(setUser(null));
        }
      } catch (error) {
        console.error("Общая ошибка инициализации:", error);
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
