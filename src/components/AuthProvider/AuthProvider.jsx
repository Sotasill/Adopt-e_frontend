import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth, setUser, refreshToken } from "../../redux/auth/authActions";
import { jwtDecode } from "jwt-decode";
import { authService } from "../../services/authService";
import { useLocation } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    let tokenCheckInterval;

    const initializeAuth = async () => {
      // Пропускаем все проверки авторизации для страницы регистрации
      if (location.pathname === "/register") {
        dispatch(setAuth(false));
        dispatch(setUser(null));
        return;
      }

      try {
        const accessToken = localStorage.getItem("accessToken");
        const storedUser = localStorage.getItem("user");

        // Если нет токена или пользователя, просто устанавливаем состояние как неавторизованный
        if (!accessToken || !storedUser) {
          dispatch(setAuth(false));
          dispatch(setUser(null));
          return;
        }

        // Проверяем токен
        try {
          const decodedToken = jwtDecode(accessToken);
          const currentTime = Date.now() / 1000;

          // Если токен истек, очищаем данные
          if (decodedToken.exp && decodedToken.exp < currentTime) {
            authService.logout();
            return;
          }

          // Парсим данные пользователя
          const userData = JSON.parse(storedUser);
          if (!userData || !userData.role) {
            dispatch(setAuth(false));
            dispatch(setUser(null));
            return;
          }

          // Устанавливаем пользователя и статус авторизации
          dispatch(setUser(userData));
          dispatch(setAuth(true));

          // Устанавливаем интервал проверки только если пользователь авторизован
          tokenCheckInterval = setInterval(async () => {
            const currentToken = localStorage.getItem("accessToken");
            if (!currentToken) {
              clearInterval(tokenCheckInterval);
              return;
            }

            try {
              const token = jwtDecode(currentToken);
              const now = Date.now() / 1000;

              if (token.exp && token.exp - now < 300) {
                try {
                  await dispatch(refreshToken());
                } catch (error) {
                  if (error.response?.status === 401) {
                    clearInterval(tokenCheckInterval);
                    authService.logout();
                  }
                }
              }
            } catch (error) {
              clearInterval(tokenCheckInterval);
              authService.logout();
            }
          }, 30000);
        } catch (error) {
          dispatch(setAuth(false));
          dispatch(setUser(null));
        }
      } catch (error) {
        dispatch(setAuth(false));
        dispatch(setUser(null));
      }
    };

    initializeAuth();

    return () => {
      if (tokenCheckInterval) {
        clearInterval(tokenCheckInterval);
      }
    };
  }, [dispatch, location.pathname]);

  return children;
};

export default AuthProvider;
