const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");

const ActiveToken = require("../models/active_token");

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
      console.log(req.decodedToken.jti);
      const activeToken = await ActiveToken.findOne({
        where: {
          tokenId: req.decodedToken.jti,
        },
      });
      if (!activeToken) {
        return res.status(401).json({ error: "session invalid" });
      }
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

module.exports = { tokenExtractor };
