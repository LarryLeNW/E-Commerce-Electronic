const asyncHandler = require("express-async-handler");
const Order = require("../models/order.model");
const User = require("../models/user.model");
const Counpon = require("../models/coupon.model");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { numberPhone, address, typePayment } = req.body;
  if (!(address && numberPhone && typePayment))
    throw new Error("Missing input");

  const userFound = await User.findById(_id).select("cart");
  if (!userFound.cart) throw new Error("Not found product in your cart");

  let total = userFound.cart.reduce(
    (sum, c) => (sum += c?.quantity * c?.price),
    0
  );

  if (typePayment == "Direct") {
    const response = await Order.create({
      ...req.body,
      products: userFound.cart,
      total,
      orderBy: _id,
      code: `HD-${Math.floor(Math.random() * 10000)}${_id.slice(-2)}`,
    });

    return res.json({
      success: response ? true : false,
      createdOrder: response || "Can't create new order",
    });
  }
});

const updateStatusOrder = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  const { status } = req.body;
  if (!status) throw new Error("Missing status");

  const response = await Order.findByIdAndUpdate(
    oid,
    { status },
    { new: true }
  );

  return res.json({
    success: response ? true : false,
    updatedOrder: response || "Can't change status order",
  });
});

const getOrdersUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const response = await Order.find({ orderBy: _id }).select(
    "-products -typePayment -note "
  );

  return res.json({
    success: response ? true : false,
    data: response || "Can't get order",
  });
});

const getOrderUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { oid } = req.params;
  const response = await Order.findOne({ _id: oid, orderBy: _id });
  console.log("🚀 ~ getOrderUser ~ response:", response);
  return res.json({
    success: response ? true : false,
    data: response || "Can't get order",
  });
});

const getOrders = asyncHandler(async (req, res) => {
  const response = await Order.find();
  return res.json({
    success: response ? true : false,
    data: response || "Can't get orders",
  });
});

module.exports = {
  createOrder,
  updateStatusOrder,
  getOrdersUser,
  getOrders,
  getOrderUser,
};
