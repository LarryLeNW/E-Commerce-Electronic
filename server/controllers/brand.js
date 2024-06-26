const asyncHandler = require("express-async-handler");
const Brand = require("../models/brand");

const createBrand = asyncHandler(async (req, res) => {
  const response = await Brand.create(req.body);
  return res.json({
    success: response ? true : false,
    createdBrand: response || "Can't create new brand",
  });
});

const getBrands = asyncHandler(async (req, res) => {
  const response = await Brand.find();
  return res.json({
    success: response ? true : false,
    brands: response || "Can't get brands",
  });
});

const updateBrand = asyncHandler(async (req, res) => {
  const { bid } = req.params;

  const response = await Brand.findByIdAndUpdate(bid, req.body, {
    new: true,
  });

  return res.json({
    success: response ? true : false,
    updatedBrand: response || "Can't update this Brand",
  });
});

const deleteBrand = asyncHandler(async (req, res) => {
  const { bid } = req.params;

  const response = await Brand.findByIdAndDelete(bid);

  return res.json({
    success: response ? true : false,
    deletedCategory: response || "Can't delete this Brand",
  });
});

module.exports = {
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
};
