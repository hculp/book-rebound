const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const salePostSchema = new Schema({
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
  post_content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 300,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const SalePost = model("SellPost", salePostSchema);

module.exports = SalePost;
