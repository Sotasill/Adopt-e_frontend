import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import { toast } from "sonner";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const storedUser = localStorage.getItem("user");

        // Если нет токена или данных пользователя, или состояние Redux не инициализировано
        if (!accessToken || !storedUser || !isAuthenticated || !user) {
          setIsChecking(false);
          return;
        }

        setIsChecking(false);
      } catch (error) {
        console.error("Ошибка при проверке аутентификации:", error);
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [isAuthenticated, user]);

  if (isChecking) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated || !user) {
    toast.error("Необходима авторизация для доступа к этой странице");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Проверка роли пользователя
  if (allowedRoles.length > 0) {
    const userRole = user.role.toLowerCase();
    if (!allowedRoles.map((role) => role.toLowerCase()).includes(userRole)) {
      toast.error("У вас нет доступа к этой странице");
      // Перенаправляем на соответствующую страницу в зависимости от роли
      const redirectPath =
        userRole === "breeder"
          ? "/mainbcs"
          : userRole === "user"
          ? "/mainusersystem"
          : userRole === "specialist"
          ? "/mainspecialist"
          : "/";
      return <Navigate to={redirectPath} replace />;
    }
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
