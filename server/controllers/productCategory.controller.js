const asyncHandler = require("express-async-handler");
const ProductCategory = require("../models/productCategory.model");

const createCategory = asyncHandler(async (req, res) => {
  req.body.thumb = req.file.path;
  const response = await ProductCategory.create(req.body);
  return res.json({
    success: response ? true : false,
    createdCategory: response || "Can't create new prodCategories",
  });
});

const getCategories = asyncHandler(async (req, res) => {
  let formattedQueries = {};

  if (req.query?.keyword) {
    formattedQueries["$or"] = [
      { title: { $regex: req.query?.keyword, $options: "i" } },
    ];
  }
  console.log("🚀 ~ getCategories ~ formattedQueries:", formattedQueries);

  const response = await ProductCategory.find(formattedQueries);
  return res.json({
    success: response ? true : false,
    data: response || [],
  });
});

const updateCategory = asyncHandler(async (req, res) => {
  const { pcid } = req.params;
  req.body.thumb = req.file.path;
  const response = await ProductCategory.findByIdAndUpdate(pcid, req.body, {
    new: true,
  });
  return res.json({
    success: !!response,
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
