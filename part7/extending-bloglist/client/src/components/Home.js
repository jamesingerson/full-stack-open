import LoginForm from "../components/LoginForm";
import Togglable from "../components/Togglable";
import Blog from "../components/Blog";
import BlogForm from "../components/BlogForm";
import blogService from "../services/blogs";

import { activeUser } from "../reducers/userReducer";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedInBlogAppUser");
    blogService.setToken("");
    dispatch(activeUser(null));
  };

  return (
    <>
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogout}>Logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} user={user} />
            ))}
        </div>
      )}
    </>
  );
};

export default Home;
