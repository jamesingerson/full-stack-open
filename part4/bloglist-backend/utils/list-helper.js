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
  return 1;
};

const mostLikes = (blogs) => {
  return 1;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
