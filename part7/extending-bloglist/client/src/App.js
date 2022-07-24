import Notification from "./components/Notification";
import UserList from "./components/UserList";
import Home from "./components/Home";
import SingleUser from "./components/SingleUser";
import blogService from "./services/blogs";

import { activeUser } from "./reducers/userReducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { Routes, Route, Link } from "react-router-dom";

import "./index.css";
import { initializeUserList } from "./reducers/userListReducer";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeUserList());
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(activeUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedInBlogAppUser");
    blogService.setToken("");
    dispatch(activeUser(null));
  };

  const padding = {
    padding: 5,
  };

  return (
    <div>
      <div>
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

      <h2>Blog List</h2>
      <Notification />

      <Routes>
        <Route path="/users/:id" element={<SingleUser />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
