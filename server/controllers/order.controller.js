const asyncHandler = require("express-async-handler");
const Order = require("../models/order.model");
const User = require("../models/user.model");
const Counpon = require("../models/coupon.model");
const moment = require("moment");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  console.log("🚀 ~ createOrder ~ _id:", _id);
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

const getOrdersByAdmin = asyncHandler(async (req, res) => {
  const queries = { ...req.query };

  const excludeFields = [
    "limit",
    "sort",
    "page",
    "fields",
    "product",
    "total",
    "typePayment",
  ];

  excludeFields.forEach((el) => delete queries[el]);

  let formattedQueries = {};

  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (el) => `$${el}`);
  formattedQueries = JSON.parse(queryString);

  console.log("🚀 ~ getOrdersByAdmin ~ formattedQueries:", formattedQueries);

  // Create ordersQuery with populated 'orderBy' field
  const ordersQuery = Order.find(formattedQueries)
    .select("-products ")
    .populate({
      path: "orderBy",
      select: "username ",
    });

  // sorting
  if (req.query.sort) {
    let sortBy = req.query.sort.split(",").join(" ");
    ordersQuery.sort(sortBy);
  }

  // fields limiting
  if (req.query.fields) {
    let fields = req.query.fields.split(",").join(" ");
    ordersQuery.select(fields);
  }

  // Pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || +process.env.LIMIT_PRODUCT || 10;
  const skip = (page - 1) * limit;
  ordersQuery.skip(skip).limit(limit);

  // Execute ordersQuery and count documents
  const orders = await ordersQuery;
  const counts = await Order.find(formattedQueries).countDocuments();

  // Return response
  return res.json({
    success: !!orders,
    data: orders || "Can't get orders",
    counts,
  });
});

const deleteOrder = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  const response = await Order.findByIdAndDelete(oid);
  return res.json({
    success: !!response,
    message:
      `Deleted order with code response ${response.code}` ||
      "Can't delete this order",
  });
});

module.exports = {
  createOrder,
  updateStatusOrder,
  getOrdersUser,
  getOrdersByAdmin,
  getOrderUser,
  deleteOrder,
};
