import LoginForm from "../components/LoginForm";
import Togglable from "../components/Togglable";
import BlogForm from "../components/BlogForm";

import { Link } from "react-router-dom";
import { useRef } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  return (
    <>
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <ul>
            {[...blogs]
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <li key={blog.id}>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Home;
