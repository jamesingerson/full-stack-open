const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: { type: String, minLength: 3, required: true, unique: true },
  number: {
    type: String,
    validate: {
      validator: (v) => {
        // min length will ensure suffix of appropriate length
        return /^\d{2,3}-\d+$/.test(v);
      },
      message: (props) => `${props.value} phone number format not recognised`,
    },
    minLength: 8,
    required: true,
  },
  date: Date,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
