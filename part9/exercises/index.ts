import { calculateBmi } from "./calculateBmi";
import express from "express";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  let bmi;

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).send({
      error: "malformed parameters",
    });
  }

  bmi = calculateBmi(height, weight);

  return res.send(JSON.stringify({ height, weight, bmi }));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
