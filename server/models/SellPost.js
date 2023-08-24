const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const sellPostSchema = new Schema({
  id: {
    type: String,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  post_user: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 300,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const SellPost = model("SellPost", sellPostSchema);

module.exports = SellPost;
