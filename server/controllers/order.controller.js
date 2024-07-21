const asyncHandler = require("express-async-handler");
const Order = require("../models/order.model");
const User = require("../models/user.model");
const Counpon = require("../models/coupon.model");
const moment = require("moment");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { numberPhone, address, typePayment, products, total } = req.body;
  if (!(address && numberPhone && typePayment && products && total))
    throw new Error("Missing input");

  const response = await Order.create({
    ...req.body,
    orderBy: _id,
    code: `HD-${Math.floor(Math.random() * 10000)}${_id.slice(-2)}`,
  });

  return res.json({
    success: response ? true : false,
    data: response || "Can't create new order",
  });
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

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

module.exports = {
  createOrder,
  updateStatusOrder,
  getOrdersUser,
  getOrders,
  getOrderUser,
};
