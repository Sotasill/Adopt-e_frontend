import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { useEffect } from "react";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!user || !user.role) {
      toast.error("Ошибка: роль пользователя не определена");
      navigate("/login");
      return;
    }

    const userRole = user.role.toLowerCase();
    const normalizedAllowedRoles = allowedRoles.map((role) =>
      role.toLowerCase()
    );

    if (!normalizedAllowedRoles.includes(userRole)) {
      toast.error(`Доступ запрещен для роли ${userRole}`);

      if (userRole === "user") {
        navigate("/mainusersystem", { replace: true });
      } else if (userRole === "breeder") {
        navigate("/mainbcs", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [isAuthenticated, user, allowedRoles, navigate]);

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
