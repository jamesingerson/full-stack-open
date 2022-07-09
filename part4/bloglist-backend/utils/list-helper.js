const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const favourite = blogs.sort((a, b) => b.likes - a.likes)[0];
  return {
    title: favourite.title,
    author: favourite.author,
    likes: favourite.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  // Array of authors names, with repeats
  const authors = blogs.map((blog) => blog.author);
  // Object with each authors name and count of their posts
  const blogCount = authors.reduce((blogCount, author) => {
    return (blogCount[author] = (blogCount[author] || 0) + 1), blogCount;
  }, {});
  // Identify the author with the most posts by keeping track of the top author
  const topAuthor = Object.keys(blogCount).reduce((topAuthor, author) =>
    blogCount[topAuthor] > blogCount[author] ? topAuthor : author
  );
  // Return top author object
  return { author: topAuthor, blogs: blogCount[topAuthor] };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
