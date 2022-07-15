import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "Test Post",
    author: "James Ingerson",
    url: "https://example.com",
    likes: 5,
    user: {
      username: "jamesi",
    },
  };

  const user = {
    username: "jamesi",
  };

  const post = render(<Blog blog={blog} user={user} />).container;

  // Blog name and author are present
  const collapsedPost = screen.getByText("Test Post James Ingerson");
  expect(collapsedPost).toBeDefined();

  // Collapsed blog with title and author is visible to start with
  const collapsed = post.querySelector(".collapsed-blog");
  expect(collapsed).not.toHaveStyle("display: none");

  // Expanded blog with url and likes are not visible to start with
  const expanded = post.querySelector(".expanded-blog");
  expect(expanded).toHaveStyle("display: none");
});
