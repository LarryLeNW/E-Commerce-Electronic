const mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Types.ObjectId, ref: "Product" },
      count: Number,
      color: String,
    },
  ],
  status: {
    type: String,
    default: "Proccessing",
    enum: ["Cancelled", "Proccessing", "Successed"],
  },
  total: {},
  coupon: {
    type: mongoose.Types.ObjectId,
    ref: "Coupon",
  },
  orderBy: { type: mongoose.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Order", orderSchema);
