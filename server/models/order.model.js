const mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Types.ObjectId, ref: "Product" },
      quantity: Number,
      color: String,
      price: Number,
      thumb: String,
      title: String,
    },
  ],
  status: {
    type: String,
    default: "Processing",
    enum: ["Cancelled", "Processing", "Succeed"],
  },
  total: Number,
  typePayment: {
    type: String,
    enum: ["Direct", "Paypal"],
    default: "Direct",
  },
  // coupon: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "Coupon",
  // },
  orderBy: { type: mongoose.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Order", orderSchema);
