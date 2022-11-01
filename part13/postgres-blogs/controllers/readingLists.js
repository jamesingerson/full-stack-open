const { tokenExtractor } = require("../util/middleware");

const router = require("express").Router();

const { Blog, User, ReadingList } = require("../models");

const readingListFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.blogId);
  req.user = await User.findByPk(req.params.userId);
  next();
};

router.post("/", readingListFinder, async (req, res) => {
  try {
    const readingListEntry = await ReadingList.create({
      ...req.body,
    });
    res.json(readingListEntry);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put("/:id", tokenExtractor, async (req, res) => {
  const readingList = await ReadingList.findByPk(req.params.id);
  const user = await User.findByPk(req.decodedToken.id);
  console.log("ids", user.id, readingList.userId);
  if (readingList && user && user.id === readingList.userId) {
    readingList.read = req.body.read;
    await readingList.save();
    res.json({ read: req.body.read });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
