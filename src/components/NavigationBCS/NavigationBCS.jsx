import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Navigation = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <List component="nav" sx={{ width: '100%' }}>
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Главная" />
      </ListItem>

      {isAuthenticated && (
        <>
          <ListItem button component={Link} to="/pets">
            <ListItemIcon>
              <PetsIcon />
            </ListItemIcon>
            <ListItemText primary="Мои питомцы" />
          </ListItem>

          <ListItem button component={Link} to="/calendar">
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary="Календарь" />
          </ListItem>

          <ListItem button component={Link} to="/settings">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Настройки" />
          </ListItem>
        </>
      )}
    </List>
  );
};

export default Navigation;
