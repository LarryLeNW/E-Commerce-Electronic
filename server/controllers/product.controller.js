const Product = require("../models/product.model");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createProduct = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const newProduct = await Product.create(req.body);
  return res.status(200).json({
    success: newProduct ? true : false,
    createdProduct: newProduct ? newProduct : "Cannot create new product",
  });
});
const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findById(pid);
  return res.status(200).json({
    success: product ? true : false,
    productData: product ? product : "Cannot get product",
  });
});

const getProducts = asyncHandler(async (req, res) => {
  const queries = { ...req.query };

  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  // format operators for mongoose syntax
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (el) => `$${el}`);
  const formattedQueries = JSON.parse(queryString);

  // filtering
  if (queries?.title)
    formattedQueries.title = { $regex: queries.title, $options: "i" };

  const productsQuery = Product.find(formattedQueries);

  // sorting
  if (req.query.sort) {
    let sortBy = req.query.sort.split(",").join(" ");
    productsQuery.sort(sortBy);
  }

  // fields limiting
  if (req.query.fields) {
    let fields = req.query.fields.split(",").join(" ");
    productsQuery.select(fields);
  }

  // Pagination
  const page = +req.query.page || 1;
  const limit = req.query.limit || process.env.LIMIT_PRODUCT;
  const skip = (page - 1) * limit;
  productsQuery.skip(skip).limit(limit);

  // exec
  const products = await productsQuery;
  const counts = await Product.find(formattedQueries).countDocuments();

  res.status(200).json({
    success: products.length > 0,
    data: products || [],
    counts,
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updatedProduct ? true : false,
    updatedProduct: updatedProduct ? updatedProduct : "Cannot update product",
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(pid);
  return res.status(200).json({
    success: deletedProduct ? true : false,
    deletedProduct: deletedProduct ? deletedProduct : "Cannot delete product",
  });
});

const ratings = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, pid } = req.body;

  if (!star || !pid) throw new Error("Missing inputs");

  // if exit update rating
  const result = await Product.findOneAndUpdate(
    {
      _id: pid,
      "ratings.postedBy": _id,
    },
    {
      $set: { "ratings.$.star": star, "ratings.$.comment": comment },
    },
    { new: true, upsert: true, runValidators: true }
  );

  // if not exit add new rating
  if (!result) {
    await Product.findByIdAndUpdate(
      pid,
      {
        $addToSet: { ratings: { star, comment, postedBy: _id } },
      },
      { new: true, upsert: true }
    );
  }

  // SUM total rating
  const updatedProduct = await Product.findById(pid).select("ratings");
  const ratingCounts = updatedProduct.ratings.length;
  const sumRatings = updatedProduct.ratings.reduce(
    (sum, el) => (sum += +el.star),
    0
  );

  updatedProduct.totalRatings =
    Math.round((sumRatings * 10) / ratingCounts) / 10;

  await updatedProduct.save();

  return res.status(200).json({
    status: true,
  });
});

const uploadImagesProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!req.files) throw new Error("missing inputs");
  const response = await Product.findByIdAndUpdate(
    pid,
    {
      $push: { images: { $each: req.files.map((el) => el.path) } },
    },
    { new: true }
  );

  return res.status(200).json({
    success: response ? true : false,
    updatedProduct: response || "Cannot upload image product",
  });
});

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  ratings,
  uploadImagesProduct,
};
