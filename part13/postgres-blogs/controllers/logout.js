const { tokenExtractor } = require("../util/middleware");
const router = require("express").Router();

const ActiveToken = require("../models/active_token");

router.delete("/", tokenExtractor, async (req, res) => {
  await ActiveToken.destroy({ where: { tokenId: req.decodedToken.jti } });
  res.status(200).end();
});

module.exports = router;
