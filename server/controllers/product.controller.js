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
    data: product ? product : "Cannot get product",
  });
});

const convertToPriceQueryMongo = (from, to) => {
  if (from && to) {
    return {
      $and: [{ price: { $gte: from } }, { price: { $lte: to } }],
    };
  }
  if (from) return { price: { $gte: from } };
  if (to) return { price: { $lte: to } };
  return null;
};

const getProducts = asyncHandler(async (req, res) => {
  const queries = { ...req.query };

  const excludeFields = [
    "limit",
    "sort",
    "page",
    "fields",
    "title",
    "keyword",
    "priceFrom",
    "priceTo",
  ];

  excludeFields.forEach((el) => delete queries[el]);

  // format operators for mongoose syntax
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (el) => `$${el}`);
  let formattedQueries = JSON.parse(queryString);

  // filtering
  if (req.query?.keyword)
    formattedQueries.title = { $regex: req.query.keyword, $options: "i" };

  if (queries?.category)
    formattedQueries.category = { $regex: queries.category, $options: "i" };

  if (queries?.color) {
    delete formattedQueries.color;
    const colorArr = queries?.color?.split(",");
    const colorQuery = colorArr.map((el) => ({
      color: { $regex: el, $options: "i" },
    }));
    formattedQueries["$or"] = colorQuery;
  }

  const priceQuery = convertToPriceQueryMongo(
    req.query?.priceFrom,
    req.query?.priceTo
  );

  if (priceQuery) formattedQueries = { ...formattedQueries, ...priceQuery };

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

  const product = await Product.findById(pid);

  if (!product) {
    throw new Error("Product not found");
  }

  const index = product.ratings.findIndex((rating) =>
    rating.postedBy.equals(_id)
  );

  if (index !== -1) {
    product.ratings[index].star = star;
    product.ratings[index].comment = comment;
  } else {
    product.ratings.push({ star, comment, postedBy: _id });
  }

  const ratingCounts = product.ratings.length;
  const sumRatings = product.ratings.reduce((sum, el) => sum + el.star, 0);
  product.totalRatings = Math.round((sumRatings * 10) / ratingCounts) / 10;

  await product.save();

  return res.status(200).json({
    status: true,
    data: product.ratings,
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
