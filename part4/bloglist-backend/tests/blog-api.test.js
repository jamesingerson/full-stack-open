const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test-helper");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("after initial blogs are saved", () => {
  test("expected number of blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("unique property is called id", async () => {
    const response = await api.get("/api/blogs");
    const blog = response.body[0];
    expect(blog.id).toBeDefined;
  });
});

describe("a new blog is posted", () => {
  test("valid data is handled correctly", async () => {
    const newBlog = {
      title: "Valid Blog Post",
      author: "James Ingerson",
      url: "https://www.example.com/valid-post",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAfterPost = await helper.blogsInDb();
    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length + 1);

    const contents = blogsAfterPost.map((b) => b.title);
    expect(contents).toContain("Valid Blog Post");
  });

  test("missing likes means 0 likes", async () => {
    const newBlog = {
      title: "Missing Likes Post",
      author: "James Ingerson",
      url: "https://www.example.com/missing-likes-post",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAfterPost = await helper.blogsInDb();
    const partialPost = blogsAfterPost.find(
      (p) => p.title === "Missing Likes Post"
    );
    expect(partialPost.likes).toEqual(0);
  });

  test("posts missing title and url are not accepted", async () => {
    const newBlog = {
      author: "James Ingerson",
      likes: 164,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const blogsAfterPost = await helper.blogsInDb();
    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
