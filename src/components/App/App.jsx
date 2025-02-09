import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
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
import { setLanguage } from "../../redux/language/languageSlice";
import BreedersPage from "../../pages/BreedersPage/BreedersPage";
import AboutPage from "../../pages/AboutPage/AboutPage";
import BreedsListPage from "../../pages/BreedsListPage/BreedsListPage";
import BreedPage from "../../pages/BreedPage/BreedPage";
import ProductsPage from "../../pages/ProductsPage/ProductsPage";
import styles from "./App.module.css";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

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
  const dispatch = useDispatch();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      dispatch(setLanguage(savedLanguage));
    }
  }, [dispatch]);

  return (
    <AuthProvider>
      <Layout className={styles.root}>
        <main className={styles.main}>
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
                <ProtectedRoute
                  allowedRoles={["breeder", "Breeder", "BREEDER"]}
                >
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
            <Route
              path="/kennels"
              element={
                <PublicRoute>
                  <BreedersPage />
                </PublicRoute>
              }
            />
            <Route
              path="/breeds"
              element={
                <PublicRoute>
                  <BreedsListPage />
                </PublicRoute>
              }
            />
            <Route
              path="/breeds/:type/:breedId"
              element={
                <PublicRoute>
                  <BreedPage />
                </PublicRoute>
              }
            />
            <Route
              path="/about"
              element={
                <PublicRoute>
                  <AboutPage />
                </PublicRoute>
              }
            />
            {/* Маршруты для продуктов и услуг */}
            <Route
              path="/products"
              element={
                <PublicRoute>
                  <ProductsPage type="products" />
                </PublicRoute>
              }
            />
            <Route
              path="/services"
              element={
                <PublicRoute>
                  <ProductsPage type="services" />
                </PublicRoute>
              }
            />
            <Route
              path="/veterinary"
              element={
                <PublicRoute>
                  <ProductsPage type="veterinary" />
                </PublicRoute>
              }
            />
            {/* Перенаправляем все неизвестные маршруты на домашнюю страницу */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster position="top-right" richColors />
        </main>
      </Layout>
    </AuthProvider>
  );
};

export default App;
