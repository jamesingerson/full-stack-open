import { useState } from "react";

const Blog = ({ blog }) => {
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

  const increaseLikes = (blog) => {
    console.log(blog);
  };

  return (
    <>
      <div style={hideWhenExpanded}>
        {blog.title}{" "}
        <button onClick={() => toggleExpanded()}>View Details</button>
      </div>
      <div style={showWhenExpanded}>
        <p>{blog.title}</p>
        <p>{blog.url}</p>
        <p>
          {blog.likes}{" "}
          <button onClick={() => increaseLikes({ blog })}>Like</button>
        </p>
        <p>{blog.author}</p>
        <button onClick={() => toggleExpanded()}>Collapse</button>
      </div>
    </>
  );
};

export default Blog;
