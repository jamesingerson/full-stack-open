import Notification from "./components/Notification";
import UserList from "./components/UserList";
import Home from "./components/Home";
import SingleUser from "./components/SingleUser";
import SingleBlog from "./components/SingleBlog";
import NavBar from "./components/NavBar";
import blogService from "./services/blogs";

import { activeUser } from "./reducers/userReducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";

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

  return (
    <div className="container p-6">
      <NavBar />

      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <Routes>
          <Route path="/blogs/:id" element={<SingleBlog />} />
          <Route path="/users/:id" element={<SingleUser />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/" element={<Home />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
