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

  const padding = {
    padding: 5,
  };

  const backdrop = {
    backgroundColor: "lightgrey",
    padding: 10,
  };

  return (
    <div style={backdrop}>
      <Link style={padding} to="/">
        Blogs
      </Link>
      <Link style={padding} to="/users">
        Users
      </Link>
      {user && (
        <span>
          {" "}
          {user.name} logged in <button onClick={handleLogout}>Logout</button>
        </span>
      )}
    </div>
  );
};

export default NavBar;
