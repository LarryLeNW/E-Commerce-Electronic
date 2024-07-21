const asyncHandler = require("express-async-handler");
const Blog = require("../models/blog.model");

const createNewBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { title, description, category } = req.body;
  req.body.thumb = req.file.path;

  if (!(title && description && category)) throw new Error("Missing inputs");

  const response = await Blog.create({ ...req.body, author: _id });
  return res.json({
    success: response ? true : false,
    createdBlog: response || "Can't create new blog",
  });
});

const getBlogs = asyncHandler(async (req, res) => {
  const queries = { ...req.query };

  const excludeFields = [
    "limit",
    "sort",
    "page",
    "fields",
    "keyword",
    "priceFrom",
    "priceTo",
  ];

  excludeFields.forEach((el) => delete queries[el]);

  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (el) => `$${el}`);
  let formattedQueries = JSON.parse(queryString);

  // filtering
  if (req.query?.keyword) {
    formattedQueries["$or"] = [
      { title: { $regex: req.query?.keyword, $options: "i" } },
      { description: { $regex: req.query?.keyword, $options: "i" } },
    ];
  }

  if (queries?.category)
    formattedQueries.category = { $regex: queries.category, $options: "i" };

  const blogsQuery = Blog.find(formattedQueries).populate({
    path: "author",
    select: "username",
  });

  // sorting
  if (req.query.sort) {
    let sortBy = req.query.sort.split(",").join(" ");
    blogsQuery.sort(sortBy);
  }

  // fields limiting
  if (req.query.fields) {
    let fields = req.query.fields.split(",").join(" ");
    blogsQuery.select(fields);
  }

  // Pagination
  const page = +req.query.page || 1;
  const limit = req.query.limit || process.env.LIMIT_PRODUCT;
  const skip = (page - 1) * limit;
  blogsQuery.skip(skip).limit(limit);

  const blogs = await blogsQuery;
  const counts = await Blog.find(formattedQueries).countDocuments();

  return res.json({
    success: !!blogs,
    data: blogs || "Can't get blogs",
    counts,
  });
});

const updateBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  req.body.thumb = req.file.path;
  if (Object.keys(req.body).length === 0) throw new Error("missing inputs");

  const response = await Blog.findByIdAndUpdate(bid, req.body, {
    new: true,
  });

  return res.json({
    success: response ? true : false,
    updatedBlog: response || "Can't update this Blog",
  });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;

  const response = await Blog.findByIdAndDelete(bid);

  return res.json({
    success: response ? true : false,
    deletedBlog: response || "Can't delete this Blog",
  });
});

const reactBlog = asyncHandler(async (req, res) => {
  const { bid, type } = req.params;
  const { _id } = req.user;

  if (!["like", "dislike"].includes(type)) {
    return res.status(400).json({ success: false, message: "Invalid type" });
  }

  const blog = await Blog.findById(bid);

  if (!blog) {
    return res.status(404).json({ success: false, message: "Blog not found" });
  }

  const existingInteractionIndex = blog.interactions.findIndex(
    (interaction) => interaction.user.toString() === _id.toString()
  );

  if (existingInteractionIndex !== -1) {
    if (blog.interactions[existingInteractionIndex].type === type) {
      blog.interactions.splice(existingInteractionIndex, 1);
      blog.totalReaction -= 1;
    } else blog.interactions[existingInteractionIndex].type = type;
  } else {
    blog.interactions.push({ user: _id, type });
    blog.totalReaction += 1;
  }

  await blog.save();

  return res.json({
    success: true,
    message: "Reacted blog successfully",
    blog,
  });
});

const getBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;

  const response = await Blog.findByIdAndUpdate(
    bid,
    {
      $inc: { numberViews: 1 },
    },
    { new: true }
  )
    .populate({
      path: "interactions.user",
      select: "username ",
    })
    .populate({
      path: "author",
      select: "username",
    });
  return res.json({
    success: response ? true : false,
    data: response || "Can't get blogs",
  });
});

const uploadImageBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (!req.file) throw new Error("missing inputs");
  const response = await Blog.findByIdAndUpdate(
    bid,
    {
      image: req.file.path,
    },
    { new: true }
  );

  return res.status(200).json({
    success: response ? true : false,
    updatedBlog: response || "Cannot upload image blog",
  });
});

module.exports = {
  createNewBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  reactBlog,
  getBlog,
  uploadImageBlog,
};
