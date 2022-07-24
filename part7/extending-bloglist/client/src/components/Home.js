import Togglable from "../components/Togglable";
import BlogForm from "../components/BlogForm";

import { Link } from "react-router-dom";
import { useRef } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const blogs = useSelector((state) => state.blogs);

  const blogFormRef = useRef();

  return (
    <>
      <div>
        <Togglable buttonLabel="New Blog" ref={blogFormRef}>
          <BlogForm />
        </Togglable>
        <ul>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <div key={blog.id} className="card m-6">
                <div className="card-content">
                  <div className="content has-text-centered">
                    <li>
                      <Link
                        className="is-size-1 has-text-info"
                        to={`/blogs/${blog.id}`}
                      >
                        {blog.title}
                      </Link>
                    </li>
                  </div>
                </div>
              </div>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
