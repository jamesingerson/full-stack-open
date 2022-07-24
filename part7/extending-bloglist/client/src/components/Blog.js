import { useState } from "react";
import { useDispatch } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const hideWhenExpanded = { display: expanded ? "none" : "" };
  const showWhenExpanded = {
    display: expanded ? "" : "none",
    paddingTop: 2,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleRemoval = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog));
    }
  };

  return (
    <>
      <div style={hideWhenExpanded} className="collapsed-blog">
        {blog.title} {blog.author}
        <button onClick={() => toggleExpanded()}>View Details</button>
      </div>
      <div style={showWhenExpanded} className="expanded-blog">
        <p>
          {blog.title}{" "}
          <button onClick={() => toggleExpanded()}>Collapse</button>
        </p>
        <p>{blog.url}</p>
        <p>
          {blog.likes}{" "}
          <button onClick={() => dispatch(likeBlog(blog))}>Like</button>
        </p>
        <p>{blog.author}</p>
        {blog.user && user.username === blog.user.username && (
          <button onClick={() => handleRemoval(blog)}>Remove</button>
        )}
      </div>
    </>
  );
};

export default Blog;
