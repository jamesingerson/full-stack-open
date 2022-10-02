import { calculator } from "./calculator";

import express from "express";
const app = express();

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.post("/calculate", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  if (!value1 || isNaN(Number(value1)) || !value2 || isNaN(Number(value2))) {
    return res.status(400).send({ error: "unsupported values provided" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculator(value1, value2, op);
  return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
