const asyncHandler = require("express-async-handler");
const BlogCategory = require("../models/blogCategory.model");

const createCategory = asyncHandler(async (req, res) => {
  const response = await BlogCategory.create(req.body);
  return res.json({
    success: response ? true : false,
    createdCategory: response || "Can't create new blogCategories",
  });
});

const getCategories = asyncHandler(async (req, res) => {
  const response = await BlogCategory.find().select("title _id");
  return res.json({
    success: response ? true : false,
    blogCategories: response || "Can't get blogCategories",
  });
});

const updateCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params;

  const response = await BlogCategory.findByIdAndUpdate(bcid, req.body, {
    new: true,
  });

  return res.json({
    success: response ? true : false,
    updatedCategory: response || "Can't update this blogCategory",
  });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params;

  const response = await BlogCategory.findByIdAndDelete(bcid);

  return res.json({
    success: response ? true : false,
    deletedCategory: response || "Can't delete this blogCategory",
  });
});

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
