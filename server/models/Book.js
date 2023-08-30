const mongoose = require("mongoose");

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
  },
  condition: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
  },
  listedPrice: {
    type: Number,
    required: true,
    min: 0.99,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;