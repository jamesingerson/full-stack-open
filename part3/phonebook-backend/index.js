require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person");

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

morgan.token("body", function (request, response) {
  if (request.method === "POST") {
    return JSON.stringify(request.body);
  }
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [];

const generateId = () => {
  return Math.floor(Math.random() * 100_000_000 + 1);
};

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
  );
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({ error: "No name provided" });
  }

  if (!body.number) {
    return response.status(400).json({ error: "No number provided" });
  }

  if (persons.find((person) => person.name === body.name) !== undefined) {
    return response.status(409).json({ error: "Person already in Phonebook" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
