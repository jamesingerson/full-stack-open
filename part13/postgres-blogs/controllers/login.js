const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { SECRET } = require("../util/config");
const User = require("../models/user");
const ActiveToken = require("../models/active_token");

router.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  });

  if (!!user.disabled) {
    return response.status(401).json({
      error: "account disabled",
    });
  }

  const passwordCorrect = body.password === "secret";

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const jwtid = uuidv4();

  const token = jwt.sign(userForToken, SECRET, {
    expiresIn: "1d",
    jwtid,
  });

  await ActiveToken.create({
    tokenId: jwtid,
  });

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = router;
