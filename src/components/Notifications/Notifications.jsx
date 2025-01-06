import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, Badge, Menu, MenuItem, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  selectNotifications,
  removeNotification,
} from "../../redux/notifications/notificationsSlice";
import styles from "./Notifications.module.css";

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (id) => {
    dispatch(removeNotification(id));
    handleClose();
  };

  return (
    <div className={styles.notifications}>
      <IconButton
        color="inherit"
        onClick={handleClick}
        className={styles.notificationButton}
      >
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={styles.notificationMenu}
      >
        {notifications.length === 0 ? (
          <MenuItem disabled>
            <Typography variant="body2">Нет новых уведомлений</Typography>
          </MenuItem>
        ) : (
          notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={() => handleNotificationClick(notification.id)}
              className={styles.notificationItem}
            >
              <div>
                <Typography
                  variant="subtitle2"
                  className={styles.notificationTitle}
                >
                  {notification.title}
                </Typography>
                <Typography variant="body2" className={styles.notificationText}>
                  {notification.message}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {new Date(notification.timestamp).toLocaleString()}
                </Typography>
              </div>
            </MenuItem>
          ))
        )}
      </Menu>
    </div>
  );
};

export default Notifications;
