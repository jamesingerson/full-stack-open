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
          <div className="card m-6">
            <div className="card-content">
              <div className="content">
                <h3 className="title is-3">{blog.title}</h3>
                <a href={blog.url}>{blog.url}</a>
                <p>
                  {blog.likes} likes{" "}
                  <button
                    className="button is-info is-small"
                    onClick={() => dispatch(likeBlog(blog))}
                  >
                    Like
                  </button>
                </p>
                <p>Contributed by {blog.author}</p>
              </div>
            </div>
          </div>
          {blog.user && user.username === blog.user.username && (
            <p>
              <button
                className="button is-danger is-small m-4"
                onClick={() => handleRemoval(blog)}
              >
                Remove
              </button>
            </p>
          )}
          <form onSubmit={handleCommenting}>
            <h3 className="title is-3">Add Comment:</h3>
            <p>
              <input
                className="input"
                placeholder="Comment"
                name="comment"
                id="comment"
              />
            </p>
            <button className="button is-info m-4" type="submit" id="submit">
              Submit
            </button>
          </form>
          {blog.comments.length > 0 && (
            <>
              <h3 className="title is-3">Comments:</h3>
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
