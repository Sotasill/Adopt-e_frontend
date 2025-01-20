import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Toaster } from "sonner";
import Layout from "../Layout/Layout";
import HomePage from "../../pages/HomePage/HomePage";
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import MainBCS from "../../pages/MainBCS/MainBCS";
import MainUserSystem from "../../pages/MainUserSysytem/MainUserSysytem";
import AuthProvider from "../AuthProvider/AuthProvider";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AnimalDetails from "../AnimalDetails/AnimalDetails";

// Определяем разрешенные маршруты для каждой роли
const ROLE_ROUTES = {
  user: ["/mainusersystem"],
  breeder: ["/mainbcs"],
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  console.log("PublicRoute check:", {
    isAuthenticated,
    user,
    currentPath: location.pathname,
    userRole: user?.role,
  });

  // Если пользователь аутентифицирован и у него есть роль
  if (isAuthenticated && user?.role) {
    const userRole = user.role.toLowerCase();

    // Определяем маршрут для перенаправления
    let redirectPath = "/";
    if (userRole === "breeder") {
      redirectPath = "/mainbcs";
    } else if (userRole === "user") {
      redirectPath = "/mainusersystem";
    }

    console.log("Redirecting authenticated user:", {
      role: userRole,
      redirectPath,
      currentPath: location.pathname,
    });

    // Перенаправляем только если текущий путь отличается от целевого
    if (location.pathname !== redirectPath) {
      return <Navigate to={redirectPath} replace />;
    }
  }

  return children;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

const App = () => {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <HomePage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegistrationPage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/mainbcs/*"
            element={
              <ProtectedRoute allowedRoles={["breeder", "Breeder", "BREEDER"]}>
                <MainBCS />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mainusersystem/*"
            element={
              <ProtectedRoute allowedRoles={["user", "User", "USER"]}>
                <MainUserSystem />
              </ProtectedRoute>
            }
          />
          <Route path="/animals/:id" element={<AnimalDetails />} />
          {/* Перенаправляем все неизвестные маршруты на домашнюю страницу */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-right" richColors />
      </Layout>
    </AuthProvider>
  );
};

export default App;
