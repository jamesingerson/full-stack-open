import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    increaseLikes(state, action) {
      const id = action.payload.id;
      const blogToChange = state.find((b) => b.id === id);
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      };
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    },
    blogRemoval(state, action) {
      const id = action.payload;
      const newBlogList = state.filter((b) => b.id !== id);
      return newBlogList;
    },
    appendComment(state, action) {
      const id = action.payload.id;
      const blogToComment = state.find((b) => b.id === id);
      const commentedBlog = {
        ...blogToComment,
        comments: blogToComment.comments.concat(action.payload.comment),
      };
      return state.map((blog) => (blog.id !== id ? blog : commentedBlog));
    },
  },
});

export const {
  appendBlog,
  setBlogs,
  increaseLikes,
  blogRemoval,
  appendComment,
} = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (title, author, url) => {
  return async (dispatch) => {
    const newBlog = await blogService.create({ title, author, url });
    dispatch(appendBlog(newBlog));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    });
    dispatch(increaseLikes(likedBlog));
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService
      .remove(blog.id)
      .then(() => dispatch(blogRemoval(blog.id)));
  };
};

export const addComment = (id, comment) => {
  return async (dispatch) => {
    await blogService
      .comment(id, comment)
      .then(() => dispatch(appendComment({ id, comment })));
  };
};

export default blogSlice.reducer;
