import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth, setUser, refreshToken } from "../../redux/auth/authActions";
import { jwtDecode } from "jwt-decode";
import { authService } from "../../services/authService";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log("Начало инициализации аутентификации");

        // Проверяем авторизацию через сервис
        if (!authService.isAuthenticated()) {
          console.log("Пользователь не авторизован");
          dispatch(setAuth(false));
          dispatch(setUser(null));
          return;
        }

        const accessToken = localStorage.getItem("accessToken");
        const storedUser = localStorage.getItem("user");

        console.log("Данные из localStorage:", {
          hasAccessToken: !!accessToken,
          hasUser: !!storedUser,
        });

        if (!accessToken || !storedUser) {
          console.log("Отсутствует токен или данные пользователя");
          authService.logout();
          return;
        }

        // Проверяем токен
        try {
          const decodedToken = jwtDecode(accessToken);
          const currentTime = Date.now() / 1000;
          console.log("Проверка токена:", {
            exp: decodedToken.exp,
            currentTime,
            timeLeft: decodedToken.exp - currentTime,
          });

          // Если токен истекает в течение 5 минут или уже истек
          if (
            decodedToken.exp &&
            (decodedToken.exp - currentTime < 300 ||
              decodedToken.exp < currentTime)
          ) {
            console.log("Токен истекает или истек, пытаемся обновить");
            try {
              await dispatch(refreshToken());
              console.log("Токен успешно обновлен");
            } catch (error) {
              console.error("Ошибка при обновлении токена:", error);
              authService.logout();
              return;
            }
          }
        } catch (error) {
          console.error("Ошибка при проверке токена:", error);
          authService.logout();
          return;
        }

        // Парсим данные пользователя
        try {
          const userData = JSON.parse(storedUser);
          console.log("Данные пользователя:", userData);

          if (!userData || !userData.role) {
            console.error("Некорректные данные пользователя");
            authService.logout();
            return;
          }

          // Нормализуем роль
          userData.role = userData.role.toLowerCase();
          console.log("Роль пользователя:", userData.role);

          dispatch(setUser(userData));
          dispatch(setAuth(true));
          console.log("Аутентификация успешно восстановлена");
        } catch (error) {
          console.error("Ошибка при обработке данных пользователя:", error);
          authService.logout();
        }
      } catch (error) {
        console.error("Общая ошибка инициализации:", error);
        authService.logout();
      }
    };

    initializeAuth();

    // Устанавливаем интервал для периодической проверки токена
    const tokenCheckInterval = setInterval(() => {
      if (!authService.isAuthenticated()) {
        authService.logout();
        return;
      }

      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const decodedToken = jwtDecode(accessToken);
          const currentTime = Date.now() / 1000;

          // Если токен истекает в течение 5 минут
          if (decodedToken.exp && decodedToken.exp - currentTime < 300) {
            console.log("Плановое обновление токена");
            dispatch(refreshToken()).catch((error) => {
              console.error("Ошибка при плановом обновлении токена:", error);
              authService.logout();
            });
          }
        } catch (error) {
          console.error("Ошибка при проверке токена в интервале:", error);
          authService.logout();
        }
      }
    }, 60000);

    return () => {
      clearInterval(tokenCheckInterval);
    };
  }, [dispatch]);

  return children;
};

export default AuthProvider;
