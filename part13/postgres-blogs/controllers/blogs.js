const { tokenExtractor } = require("../util/middleware");

const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { SECRET } = require("../util/config");

const { Blog, User } = require("../models");

const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  const where = {};

  if (req.query.search) {
    where[Op.or] = [
      {
        title: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      },
      {
        author: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      },
    ];
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
    where,
    order: [["likes", "DESC"]],
  });

  console.log(JSON.stringify(blogs, null, 2));

  res.json(blogs);
});

router.post("/", tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    });
    res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", [blogFinder, tokenExtractor], async (req, res) => {
  if (req.blog) {
    const user = await User.findByPk(req.decodedToken.id);
    console.log(user);
    console.log("ids", user.id, req.blog.userId);
    if (user.id === req.blog.userId) {
      await Blog.destroy({ where: { id: req.blog.id } });
      res.json(req.blog);
    } else {
      return res.status(401).json({ error: "only original poster may delete" });
    }
  } else {
    res.status(404).end();
  }
});

router.put("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json({ likes: req.blog.likes });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
