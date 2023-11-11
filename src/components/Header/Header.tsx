import { useDispatch, useSelector } from "react-redux";
import {
  selectLoggedIn,
  logoutUser,
  selectUserRole,
} from "../../redux/userSlice";
import { Link } from "react-router-dom";
import "./Header.css";
import { USER_ROLE } from "constants/userConstants";
import { resetTestsState } from "redux/testsSlice";

const Header = () => {
  const loggedIn = useSelector(selectLoggedIn);
  const userRole = useSelector(selectUserRole);
  const dispatch = useDispatch();

  const handleLogout = () => {
    //@ts-ignore
    dispatch(logoutUser());
    dispatch(resetTestsState());
  };

  return (
    <div>
      <header className="header">
        {loggedIn ? (
          <div className="header-nav-wrapper">
            <div className="header-link-wrapper">
              <Link to="/testing" className="header-link">
                {userRole === USER_ROLE.Teacher
                  ? "Тести та статистика"
                  : "Тестування"}
              </Link>
              {userRole === USER_ROLE.Teacher && (
                <Link to="/create-tests" className="header-link">
                  Створити тести
                </Link>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="header-link header-link-button"
            >
              Вихід
            </button>
          </div>
        ) : (
          <>
            <Link to="/registration" className="header-link">
              Registration
            </Link>
            <Link to="/login" className="header-link">
              Login
            </Link>
          </>
        )}
      </header>
    </div>
  );
};

export default Header;
