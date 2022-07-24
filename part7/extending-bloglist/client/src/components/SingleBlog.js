import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { likeBlog, removeBlog, addComment } from "../reducers/blogReducer";

const SingleBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const { id } = useParams();
  const blog = useSelector(
    (state) => state.blogs && state.blogs.find((b) => b.id === id)
  );

  const handleRemoval = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog));
      navigate("/");
    }
  };

  const handleCommenting = (event) => {
    event.preventDefault();
    dispatch(addComment(blog.id, event.target.comment.value));
    event.target.comment.value = "";
  };

  return (
    <>
      {blog && (
        <>
          <h3>{blog.title}</h3>
          <a href={blog.url}>{blog.url}</a>
          <p>
            {blog.likes} likes{" "}
            <button onClick={() => dispatch(likeBlog(blog))}>Like</button>
          </p>
          <p>Contributed by {blog.author}</p>
          {blog.user && user.username === blog.user.username && (
            <p>
              <button onClick={() => handleRemoval(blog)}>Remove</button>
            </p>
          )}
          <form onSubmit={handleCommenting}>
            <h3>Add Comment:</h3>
            <p>
              <input placeholder="Comment" name="comment" id="comment" />
            </p>
            <button type="submit" id="submit">
              Submit
            </button>
          </form>
          {blog.comments.length > 0 && (
            <>
              <h3>Comments:</h3>
              <ul>
                {blog.comments.map((comment) => (
                  <li key={comment}>{comment}</li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </>
  );
};

export default SingleBlog;
