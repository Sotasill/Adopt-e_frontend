import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { Toaster } from "sonner";
import { useTranslation } from "react-i18next";
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
import PetsListPage from "../../pages/PetsListPage/PetsListPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
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
  const { i18n } = useTranslation();
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      dispatch(setLanguage(savedLanguage));
    }
  }, [dispatch]);

  useEffect(() => {
    if (i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, i18n]);

  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <Layout className={styles.root}>
              <main className={styles.main}>
                <PublicRoute>
                  <HomePage />
                </PublicRoute>
                <Toaster position="top-right" richColors />
              </main>
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout className={styles.root}>
              <main className={styles.main}>
                <PublicRoute>
                  <RegistrationPage />
                </PublicRoute>
                <Toaster position="top-right" richColors />
              </main>
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout className={styles.root}>
              <main className={styles.main}>
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
                <Toaster position="top-right" richColors />
              </main>
            </Layout>
          }
        />
        <Route
          path="/mainbcs/*"
          element={
            <Layout className={styles.root}>
              <main className={styles.main}>
                <ProtectedRoute
                  allowedRoles={["breeder", "Breeder", "BREEDER"]}
                >
                  <MainBCS />
                </ProtectedRoute>
                <Toaster position="top-right" richColors />
              </main>
            </Layout>
          }
        />
        <Route
          path="/mainusersystem/*"
          element={
            <Layout className={styles.root}>
              <main className={styles.main}>
                <ProtectedRoute allowedRoles={["user", "User", "USER"]}>
                  <MainUserSystem />
                </ProtectedRoute>
                <Toaster position="top-right" richColors />
              </main>
            </Layout>
          }
        />
        <Route
          path="/animals/:id"
          element={
            <Layout className={styles.root}>
              <main className={styles.main}>
                <AnimalDetails />
                <Toaster position="top-right" richColors />
              </main>
            </Layout>
          }
        />
        <Route
          path="/kennels"
          element={
            <Layout className={styles.root}>
              <main className={styles.main}>
                <PublicRoute>
                  <BreedersPage />
                </PublicRoute>
                <Toaster position="top-right" richColors />
              </main>
            </Layout>
          }
        />
        <Route
          path="/breeds"
          element={
            <Layout className={styles.root}>
              <main className={styles.main}>
                <PublicRoute>
                  <BreedsListPage />
                </PublicRoute>
                <Toaster position="top-right" richColors />
              </main>
            </Layout>
          }
        />
        <Route
          path="/breeds/:type/:breedId"
          element={
            <Layout className={styles.root}>
              <main className={styles.main}>
                <PublicRoute>
                  <BreedPage />
                </PublicRoute>
                <Toaster position="top-right" richColors />
              </main>
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout className={styles.root}>
              <main className={styles.main}>
                <PublicRoute>
                  <AboutPage />
                </PublicRoute>
                <Toaster position="top-right" richColors />
              </main>
            </Layout>
          }
        />
        <Route
          path="/products"
          element={
            <Layout className={styles.root}>
              <main className={styles.main}>
                <PublicRoute>
                  <ProductsPage type="products" />
                </PublicRoute>
                <Toaster position="top-right" richColors />
              </main>
            </Layout>
          }
        />
        <Route
          path="/services"
          element={
            <Layout className={styles.root}>
              <main className={styles.main}>
                <PublicRoute>
                  <ProductsPage type="services" />
                </PublicRoute>
                <Toaster position="top-right" richColors />
              </main>
            </Layout>
          }
        />
        <Route
          path="/veterinary"
          element={
            <Layout className={styles.root}>
              <main className={styles.main}>
                <PublicRoute>
                  <ProductsPage type="veterinary" />
                </PublicRoute>
                <Toaster position="top-right" richColors />
              </main>
            </Layout>
          }
        />
        <Route
          path="/pets"
          element={
            <Layout className={styles.root}>
              <main className={styles.main}>
                <PublicRoute>
                  <PetsListPage />
                </PublicRoute>
                <Toaster position="top-right" richColors />
              </main>
            </Layout>
          }
        />

        {/* Страница 404 без layout */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
