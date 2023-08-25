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
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  listedPrice: {
    type: Number,
    required: true,
    min: 0.99,
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

const Book = mongoose.model("Books", bookSchema);

module.exports = Book;