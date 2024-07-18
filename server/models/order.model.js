const mongoose = require("mongoose");

var orderSchema = new mongoose.Schema(
  {
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
      default: "Chờ xác nhận",
      enum: ["Chờ xác nhận", "Chờ giao", "Đang giao", "Hoàn thành", "Đã hủy"],
    },
    total: Number,
    typePayment: {
      type: String,
      enum: ["Direct", "Online"],
      default: "Direct",
    },
    note: String,
    address: String,
    numberPhone: String,
    code: String,
    // coupon: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Coupon",
    // },
    orderBy: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
