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

  if (isAuthenticated && user) {
    const userRole = user.role?.toLowerCase();
    const allowedRoutes = ROLE_ROUTES[userRole] || [];

    console.log("Redirecting authenticated user:", {
      role: userRole,
      allowedRoutes,
      currentPath: location.pathname,
    });

    // Перенаправляем на первый разрешенный маршрут для роли
    if (allowedRoutes.length > 0) {
      return <Navigate to={allowedRoutes[0]} replace />;
    }
    return <Navigate to="/" replace />;
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
