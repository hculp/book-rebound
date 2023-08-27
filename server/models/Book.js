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
  description: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  listedPrice: {
    type: Number,
    required: true,
    min: 0.99,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;