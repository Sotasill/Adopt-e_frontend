import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslations } from "../../redux/hooks/useTranslations";
import styles from "./Navigation.module.css";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import LoginModal from "../LoginModal/LoginModal";
import { useState, useEffect, useRef } from "react";
import {
  FaUserCircle,
  FaSignInAlt,
  FaUserPlus,
  FaHeart,
  FaCog,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdStorefront } from "react-icons/md";
import Aurora from "../Aurora/Aurora";
import { Avatar } from "@mui/material";
import { logoutUser } from "../../redux/auth/authActions";
import ProfileSettingsModal from "../ProfileSettingsModal/ProfileSettingsModal";
import FavoritesModal from "../FavoritesModal/FavoritesModal";

const Navigation = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  const { translate } = useTranslations();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isBcsLoginModalOpen, setIsBcsLoginModalOpen] = useState(false);
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/");
      setIsSidebarOpen(false);
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  // Обработчик клика вне сайдбара
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogoClick = () => {
    navigate("/");
    setIsSidebarOpen(false);
  };

  const SidebarContent = () => (
    <div className={styles.sidebarContent}>
      <div className={styles.sidebarHeader}>
        <button
          className={styles.closeButton}
          onClick={() => setIsSidebarOpen(false)}
        >
          <IoMdClose size={20} />
        </button>
      </div>

      {!isAuthenticated ? (
        <div className={styles.actionButtons}>
          <button
            onClick={() => {
              setIsLoginModalOpen(true);
              setIsSidebarOpen(false);
            }}
            className={styles.sidebarButton}
            title={translate("common", "navigation.login")}
          >
            <div className={styles.buttonIcon}>
              <FaSignInAlt size={32} />
            </div>
            <span className={styles.buttonLabel}>
              {translate("common", "navigation.login")}
            </span>
          </button>

          <Link
            to="/register"
            className={styles.sidebarButton}
            onClick={() => setIsSidebarOpen(false)}
            title={translate("common", "navigation.register")}
          >
            <div className={styles.buttonIcon}>
              <FaUserPlus size={32} />
            </div>
            <span className={styles.buttonLabel}>
              {translate("common", "navigation.register")}
            </span>
          </Link>

          <button
            onClick={() => {
              setIsLoginModalOpen(true);
              setIsBcsLoginModalOpen(true);
              setIsSidebarOpen(false);
            }}
            className={styles.sidebarButton}
            title="BCS"
          >
            <div className={styles.buttonIcon}>
              <MdStorefront size={32} />
            </div>
            <span className={styles.buttonLabel}>BCS</span>
          </button>
        </div>
      ) : (
        <div className={styles.actionButtons}>
          <button
            onClick={() => handleNavigation("/MainUserSystem")}
            className={styles.sidebarButton}
            title={translate("common", "navigation.myProfile")}
          >
            <div className={styles.buttonIcon}>
              {user?.avatar ? (
                <Avatar
                  src={user.avatar}
                  alt={user.name || "User"}
                  className={styles.sidebarButtonAvatar}
                />
              ) : (
                <Avatar className={styles.sidebarButtonAvatar}>
                  {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
                </Avatar>
              )}
            </div>
            <span className={styles.buttonLabel}>
              {translate("common", "navigation.myProfile")}
            </span>
          </button>

          <button
            onClick={() => {
              setIsFavoritesModalOpen(true);
              setIsSidebarOpen(false);
            }}
            className={styles.sidebarButton}
            title={translate("common", "navigation.savedAds")}
          >
            <div className={styles.buttonIcon}>
              <FaHeart size={32} />
            </div>
            <span className={styles.buttonLabel}>
              {translate("common", "navigation.savedAds")}
            </span>
          </button>

          <button
            onClick={() => {
              setIsProfileSettingsOpen(true);
              setIsSidebarOpen(false);
            }}
            className={styles.sidebarButton}
            title={translate("common", "navigation.profileSettings")}
          >
            <div className={styles.buttonIcon}>
              <FaCog size={32} />
            </div>
            <span className={styles.buttonLabel}>
              {translate("common", "navigation.profileSettings")}
            </span>
          </button>
        </div>
      )}

      <div className={styles.sidebarDivider} />

      {isAuthenticated ? (
        <div
          className={styles.sidebarLink}
          onClick={() => handleNavigation("/MainUserSystem")}
        >
          <span>{translate("common", "navigation.myProfile")}</span>
        </div>
      ) : (
        <div
          className={styles.sidebarLink}
          onClick={() => handleNavigation("/about")}
        >
          <span>{translate("common", "navigation.about")}</span>
        </div>
      )}

      <div
        className={styles.sidebarLink}
        onClick={() => handleNavigation("/breeds")}
      >
        <span>{translate("common", "breeds.title")}</span>
      </div>

      <div
        className={styles.sidebarLink}
        onClick={() => handleNavigation("/kennels")}
      >
        <span>{translate("common", "navigation.findBreeder")}</span>
      </div>

      <div
        className={styles.sidebarLink}
        onClick={() => handleNavigation("/pets")}
      >
        <span>{translate("common", "navigation.findYourPet")}</span>
      </div>

      <div className={styles.sidebarDivider} />

      <div
        className={styles.sidebarLink}
        onClick={() => handleNavigation("/products")}
      >
        <span>{translate("common", "navigation.zootovary")}</span>
      </div>

      <div
        className={styles.sidebarLink}
        onClick={() => handleNavigation("/services")}
      >
        <span>{translate("common", "navigation.services")}</span>
      </div>

      <div
        className={styles.sidebarLink}
        onClick={() => handleNavigation("/veterinary")}
      >
        <span>{translate("common", "navigation.veterinary")}</span>
      </div>

      {isAuthenticated && (
        <>
          <div className={styles.sidebarDivider} />
          <button
            onClick={handleLogout}
            className={`${styles.sidebarLink} ${styles.logoutButton}`}
          >
            <span>{translate("common", "navigation.logout")}</span>
          </button>
        </>
      )}
    </div>
  );

  return (
    <>
      <nav className={styles.navigation}>
        <div className={styles.navContainer}>
          <div className={styles.leftSide}>
            <button onClick={handleLogoClick} className={styles.homeLink}>
              <h2>Adopt-e</h2>
            </button>
          </div>

          <div className={styles.rightSide}>
            <LanguageSwitcher />
            <button
              className={styles.profileButton}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isAuthenticated ? (
                user?.avatar ? (
                  <Avatar
                    src={user.avatar}
                    alt={user.name || "User"}
                    className={styles.userAvatar}
                  />
                ) : (
                  <Avatar className={styles.userAvatar}>
                    {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
                  </Avatar>
                )
              ) : (
                <FaUserCircle size={24} className={styles.userIcon} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Сайдбар */}
      <div
        ref={sidebarRef}
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles.sidebarOpen : ""
        }`}
      >
        <div className={styles.auroraWrapper}>
          <Aurora
            colorStops={["#7f7fd5", "#86a8e7", "#91eae4"]}
            amplitude={0.8}
            speed={0.5}
          />
        </div>
        <SidebarContent />
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false);
          setIsBcsLoginModalOpen(false);
        }}
        initialType={isBcsLoginModalOpen ? "seller" : null}
        initialSubtype={isBcsLoginModalOpen ? "bcs" : null}
      />

      <ProfileSettingsModal
        isOpen={isProfileSettingsOpen}
        onClose={() => setIsProfileSettingsOpen(false)}
      />

      <FavoritesModal
        isOpen={isFavoritesModalOpen}
        onClose={() => setIsFavoritesModalOpen(false)}
      />
    </>
  );
};

export default Navigation;
