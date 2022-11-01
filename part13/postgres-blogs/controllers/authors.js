const router = require("express").Router();

const { Blog } = require("../models");
const { sequelize } = require("../util/db");

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    group: "author",
    attributes: [
      "author",
      [sequelize.fn("count", sequelize.col("blog.id")), "articles"],
      [sequelize.fn("sum", sequelize.col("likes")), "likes"],
    ],
    order: [[sequelize.fn("sum", sequelize.col("likes")), "DESC"]],
  });
  res.json(blogs);
});

module.exports = router;
