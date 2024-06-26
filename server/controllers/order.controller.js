const asyncHandler = require("express-async-handler");
const Order = require("../models/order.model");
const User = require("../models/user.model");
const Counpon = require("../models/coupon.model");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { coupon } = req.body;

  const userCart = await User.findById(_id)
    .select("cart")
    .populate("cart.product", "title price");

  const products = userCart?.cart?.map((el) => ({
    product: el.product._id,
    count: el.quantity,
    color: el.color,
  }));

  let total = userCart?.cart?.reduce(
    (sum, el) => (sum += el.product.price * el.quantity),
    0
  );

  const createdData = { products, total, orderBy: _id };

  if (coupon) {
    const selectedCoupon = await Counpon.findById(coupon);
    total =
      Math.round((total * (1 - +selectedCoupon?.discount / 100)) / 1000) * 1000;
    createdData.total = total;
    createdData.coupon = coupon;
  }

  const response = await Order.create(createdData);
  return res.json({
    success: response ? true : false,
    createdOrder: response || "Can't create new order",
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

const getOrderUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const response = await Order.find({ orderBy: _id });

  return res.json({
    success: response ? true : false,
    order: response || "Can't get order",
  });
});

const getOrders = asyncHandler(async (req, res) => {
  const response = await Order.find();

  return res.json({
    success: response ? true : false,
    orders: response || "Can't get orders",
  });
});

module.exports = {
  createOrder,
  updateStatusOrder,
  getOrderUser,
  getOrders,
};
