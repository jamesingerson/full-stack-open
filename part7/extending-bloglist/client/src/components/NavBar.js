import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import blogService from "../services/blogs";

import { activeUser } from "../reducers/userReducer";

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedInBlogAppUser");
    blogService.setToken("");
    dispatch(activeUser(null));
  };

  // https://bulma.io/documentation/components/navbar/
  document.addEventListener("DOMContentLoaded", () => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll(".navbar-burger"),
      0
    );

    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  });

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <h1 className="is-size-1">Blog List</h1>
        </Link>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="blogListNavBar"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="blogListNavBar" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to="/">
            Blogs
          </Link>
          <Link className="navbar-item" to="/users">
            Users
          </Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            {user && (
              <span>
                {" "}
                {user.name} logged in{" "}
                <button className="button" onClick={handleLogout}>
                  Logout
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
