const Product = require("../models/product.model");
const Review = require("../models/review.model");
const asyncHandler = require("express-async-handler");

const arrangeStarProduct = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  const reviews = await Review.find({ productId });
  if (!reviews) throw new Error("Reviews not found");

  const ratings = reviews.map((review) => review.star);
  const ratingCounts = ratings.length;
  const sumRatings = ratings.reduce((sum, el) => sum + el, 0);

  product.totalRatings = Math.round((sumRatings * 10) / ratingCounts) / 10;

  await product.save();

  return product;
};

const createReview = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { productId, star, comment } = req.body;

  if (!productId || (!star && !comment)) {
    throw new Error("Missing inputs");
  }

  const productFound = await Product.findById(productId);
  if (!productFound) throw new Error("Product not found");

  let review = await Review.findOneAndUpdate(
    { postedBy: _id, productId },
    { $set: { postedBy: _id, productId, star, comment } },
    { new: true, upsert: true }
  )
    .populate("postedBy", "username avatar")
    .exec();

  await arrangeStarProduct(productId);

  res.status(200).json({
    success: true,
    review,
  });
});

const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find(req.query)
    .populate("postedBy", "username avatar")
    .exec();

  res.status(200).json(reviews);
});

module.exports = {
  createReview,
  getReviews,
};
