const BlogForm = ({
  addBlog,
  newTitle,
  newAuthor,
  newUrl,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
}) => (
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

export default BlogForm;
