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
const Orders = mongoose.model("Orders", ordersSchema);
module.exports = Orders;
