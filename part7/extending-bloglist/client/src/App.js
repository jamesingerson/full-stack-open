import Notification from "./components/Notification";
import UserList from "./components/UserList";
import Home from "./components/Home";
import SingleUser from "./components/SingleUser";
import SingleBlog from "./components/SingleBlog";
import NavBar from "./components/NavBar";
import blogService from "./services/blogs";

import { activeUser } from "./reducers/userReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { Routes, Route } from "react-router-dom";

import "./index.css";
import { initializeUserList } from "./reducers/userListReducer";

const App = () => {
  const dispatch = useDispatch();

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

  return (
    <div>
      <NavBar />

      <h2>Blog List</h2>
      <Notification />

      <Routes>
        <Route path="/blogs/:id" element={<SingleBlog />} />
        <Route path="/users/:id" element={<SingleUser />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
