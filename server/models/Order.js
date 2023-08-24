const mongoose = require("mongoose");

const { Schema } = mongoose;

const ordersSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});
const Order = mongoose.model("Order", ordersSchema);
module.exports = Order;
