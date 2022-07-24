import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";

const BlogForm = () => {
  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    dispatch(
      createBlog(
        event.target.title.value,
        event.target.author.value,
        event.target.url.value
      )
    );
    dispatch(setNotification(`New blog ${event.target.title.value} added`));

    event.target.title.value = "";
    event.target.author.value = "";
    event.target.url.value = "";
  };

  return (
    <form onSubmit={addBlog}>
      <h2>new post</h2>
      <p>
        title: <input placeholder="Title" name="title" id="title" />
      </p>
      <p>
        author: <input placeholder="Author" name="author" id="author" />
      </p>
      <p>
        url: <input placeholder="Url" name="url" id="url" />
      </p>
      <button type="submit" id="submit">
        Submit
      </button>
    </form>
  );
};

export default BlogForm;
