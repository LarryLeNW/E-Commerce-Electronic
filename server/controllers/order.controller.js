const asyncHandler = require("express-async-handler");
const Order = require("../models/order.model");
const User = require("../models/user.model");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const userCart = await User.findById(_id).select("cart");

  // const response = await Order.create(req.body);
  return res.json({
    success: userCart ? true : false,
    createdOrder: userCart || "Can't create new order",
  });
});

const getCategories = asyncHandler(async (req, res) => {
  const response = await ProductCategory.find().select("title _id");
  return res.json({
    success: response ? true : false,
    prodCategories: response || "Can't get prodCategories",
  });
});

const updateCategory = asyncHandler(async (req, res) => {
  const { pcid } = req.params;

  const response = await ProductCategory.findByIdAndUpdate(pcid, req.body, {
    new: true,
  });

  return res.json({
    success: response ? true : false,
    updatedCategory: response || "Can't update this prodCategory",
  });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { pcid } = req.params;

  const response = await ProductCategory.findByIdAndDelete(pcid);

  return res.json({
    success: response ? true : false,
    deletedCategory: response || "Can't delete this prodCategory",
  });
});

module.exports = {
  createOrder,
  getCategories,
  updateCategory,
  deleteCategory,
};
