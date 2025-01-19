import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PetsIcon from "@mui/icons-material/Pets";
import SettingsIcon from "@mui/icons-material/Settings";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../redux/auth/authActions";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  return (
    <List component="nav" sx={{ width: "100%" }}>
      <ListItem disablePadding>
        <Link
          to="/"
          style={{ textDecoration: "none", color: "inherit", width: "100%" }}
        >
          <ListItem>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Главная" />
          </ListItem>
        </Link>
      </ListItem>

      {isAuthenticated && (
        <>
          <ListItem disablePadding>
            <Link
              to="/pets"
              style={{
                textDecoration: "none",
                color: "inherit",
                width: "100%",
              }}
            >
              <ListItem>
                <ListItemIcon>
                  <PetsIcon />
                </ListItemIcon>
                <ListItemText primary="Мои питомцы" />
              </ListItem>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            <Link
              to="/calendar"
              style={{
                textDecoration: "none",
                color: "inherit",
                width: "100%",
              }}
            >
              <ListItem>
                <ListItemIcon>
                  <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText primary="Календарь" />
              </ListItem>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            <Link
              to="/settings"
              style={{
                textDecoration: "none",
                color: "inherit",
                width: "100%",
              }}
            >
              <ListItem>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Настройки" />
              </ListItem>
            </Link>
          </ListItem>

          <ListItem onClick={handleLogout} sx={{ cursor: "pointer" }}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Выйти" />
          </ListItem>
        </>
      )}
    </List>
  );
};

export default Navigation;
