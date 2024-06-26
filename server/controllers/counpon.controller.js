const asyncHandler = require("express-async-handler");
const Coupon = require("../models/coupon.model");

const createCoupon = asyncHandler(async (req, res) => {
  const { name, discount, expiry } = req.body;
  if (!name || !discount || !expiry) throw new Error("missing inputs");
  const response = await Coupon.create({
    ...req.body,
    expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000,
  });
  return res.json({
    success: response ? true : false,
    createdCoupon: response || "Can't create new coupon",
  });
});

const getCoupons = asyncHandler(async (req, res) => {
  const response = await Coupon.find().select("-createdAt -updatedAt");
  return res.json({
    success: response ? true : false,
    coupons: response || "Can't get coupons",
  });
});

const updateCoupon = asyncHandler(async (req, res) => {
  const { cpid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body.expiry)
    req.body.expiry = Date.now() + +req.body.expiry * 24 * 60 * 60 * 1000;

  const response = await Coupon.findByIdAndUpdate(cpid, req.body, {
    new: true,
  });

  return res.json({
    success: response ? true : false,
    updatedCoupon: response || "Can't update this coupon",
  });
});

const deleteCoupon = asyncHandler(async (req, res) => {
  const { cpid } = req.params;

  const response = await Coupon.findByIdAndDelete(cpid);

  return res.json({
    success: response ? true : false,
    deletedCoupon: response || "Can't delete this coupon",
  });
});

module.exports = {
  createCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
};
