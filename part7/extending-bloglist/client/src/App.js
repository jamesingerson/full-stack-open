import { useEffect } from "react";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import Home from "./components/Home";

import { useDispatch } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { activeUser } from "./reducers/userReducer";
import { Routes, Route, Link } from "react-router-dom";

import "./index.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
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
      </div>

      <h2>blogs</h2>
      <Notification />

      <Routes>
        <Route path="/users" element={<></>} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
