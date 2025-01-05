import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Navigation = () => {
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!isAuthenticated && (
          <>
            <li>
              <Link to="/register">Registration</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
        {isAuthenticated && (
          <li>
            <Link to="/MainBCS">MainBCS</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
