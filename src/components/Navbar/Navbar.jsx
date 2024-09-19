import "./Navbar.css";
import Header from "../Header/Header";
import { NavLink, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import userServices from "../../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../../features/user/userSlice";
import BACKEND_URL from "../../utils/config";

const Navbar = ({ role, active }) => {
  const [view, setView] = useState(false);
  const navigate = useNavigate();
  const { currentUser, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleToggle = () => setView(!view);

  const handleClick = () => {
    const choice = confirm("Are you sure you want to logout?");
    if (choice) {
      dispatch(signOutUserStart());
      userServices
        .logout()
        .then((response) => {
          if (response.status === 200) {
            alert(response.data.message);
            dispatch(signOutUserSuccess());
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error.response.data.message);
          dispatch(signOutUserFailure(error.message));
        });
    }
  };

  const handleProfileNavigation = () => {
    navigate(`/profile`);
  };

  return (
    <>
      <nav className="navbar">
        <Header />
        {!view && (
          <RxHamburgerMenu className="hamburger-icon" onClick={handleToggle} />
        )}
        <ul className="nav-items">
          {role === "admin" ? (
            <>
              <li className={`nav-item ${active === "home" ? "active" : ""}`}>
                <NavLink to={`/${role}/dashboard`} className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className={`nav-item ${active === "users" ? "active" : ""}`}>
                <NavLink to={`/admin/users`} className="nav-link">
                  Users
                </NavLink>
              </li>
              <li
                className={`nav-item ${active === "employees" ? "active" : ""}`}
              >
                <NavLink to={`/admin/employees`} className="nav-link">
                  Employees
                </NavLink>
              </li>
              <li
                className={`nav-item ${active === "tickets" ? "active" : ""}`}
              >
                <NavLink to={`/${role}/tickets`} className="nav-link">
                  Tickets
                </NavLink>
              </li>
              <li
                className={`nav-item ${
                  active === "categories" ? "active" : ""
                }`}
              >
                <NavLink to={`/${role}/categories`} className="nav-link">
                  Categories
                </NavLink>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
        <div className="nav-footer">
          <img
            src={
              currentUser.image.includes("uploads")
                ? `${BACKEND_URL}/${currentUser.image.replace("\\", "/")}`
                : `${currentUser.image}`
            }
            alt="profile picture"
            className={`nav-profile ${
              active === "profile" ? "nav-profile-active" : ""
            }`}
            onClick={handleProfileNavigation}
          />
          <button
            className="nav-logout-btn"
            onClick={handleClick}
            disabled={loading}
          >
            Logout
          </button>
        </div>
      </nav>
      {view && (
        <div className="nav-mob">
          <div className="nav-mob-header">
            <Header />
            <RxCross2 className="hamburger-icon" onClick={handleToggle} />
          </div>
          <ul className="nav-body-mob">
            {role === "admin" ? (
              <>
                <li className={`nav-item ${active === "home" ? "active" : ""}`}>
                  <NavLink to={`/${role}/dashboard`} className="nav-link">
                    Home
                  </NavLink>
                </li>
                <li
                  className={`nav-item ${active === "users" ? "active" : ""}`}
                >
                  <NavLink to={`/admin/users`} className="nav-link">
                    Users
                  </NavLink>
                </li>
                <li
                  className={`nav-item ${
                    active === "employees" ? "active" : ""
                  }`}
                >
                  <NavLink to={`/admin/employees`} className="nav-link">
                    Employees
                  </NavLink>
                </li>
                <li
                  className={`nav-item ${active === "tickets" ? "active" : ""}`}
                >
                  <NavLink to={`/${role}/tickets`} className="nav-link">
                    Tickets
                  </NavLink>
                </li>
                <li
                  className={`nav-item ${
                    active === "categories" ? "active" : ""
                  }`}
                >
                  <NavLink to={`/${role}/categories`} className="nav-link">
                    Categories
                  </NavLink>
                </li>
              </>
            ) : (
              <></>
            )}
          </ul>
          <div className="nav-footer-mob">
            <img
              src={
                currentUser.image.includes("uploads")
                  ? `${BACKEND_URL}/${currentUser.image.replace("\\", "/")}`
                  : `${currentUser.image}`
              }
              alt="profile picture"
              className={`nav-profile ${active ? "nav-profile-active" : ""}`}
              onClick={handleProfileNavigation}
            />
            <button
              className="nav-logout-btn"
              onClick={handleClick}
              disabled={loading}
            >
              {loading ? "Logging Out..." : "Logout"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
