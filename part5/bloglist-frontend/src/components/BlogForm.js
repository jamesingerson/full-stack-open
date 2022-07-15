import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  return (
    <form onSubmit={addBlog}>
      <h2>new post</h2>
      <p>
        title: <input value={newTitle} onChange={handleTitleChange} />
      </p>
      <p>
        author: <input value={newAuthor} onChange={handleAuthorChange} />
      </p>
      <p>
        url: <input value={newUrl} onChange={handleUrlChange} />
      </p>
      <button type="submit">Submit</button>
    </form>
  );
};

export default BlogForm;
