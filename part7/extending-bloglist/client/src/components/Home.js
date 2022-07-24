import LoginForm from "../components/LoginForm";
import Togglable from "../components/Togglable";
import Blog from "../components/Blog";
import BlogForm from "../components/BlogForm";

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
