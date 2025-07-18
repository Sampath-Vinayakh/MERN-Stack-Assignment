const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true },
  publicationYear: { type: Number, required: true },
  genre: String
});

module.exports = mongoose.model("Book", bookSchema);