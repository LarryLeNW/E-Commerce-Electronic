const asyncHandler = require("express-async-handler");
const ProductCategory = require("../models/productCategory.model");

const createCategory = asyncHandler(async (req, res) => {
  const response = await ProductCategory.create(req.body);
  return res.json({
    success: response ? true : false,
    createdCategory: response || "Can't create new prodCategories",
  });
});

const getCategories = asyncHandler(async (req, res) => {
  const response = await ProductCategory.find();
  return res.json({
    success: response ? true : false,
    data: response || [],
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
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
