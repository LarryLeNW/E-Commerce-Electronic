const asyncHandler = require("express-async-handler");
const Blog = require("../models/blog");

const createNewBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;

  if (!title || !description || !category) throw new Error("Missing inputs");

  const response = await Blog.create(req.body);
  return res.json({
    success: response ? true : false,
    createdBlog: response || "Can't create new blog",
  });
});

const getBlogs = asyncHandler(async (req, res) => {
  const response = await Blog.find();
  return res.json({
    success: response ? true : false,
    blogs: response || "Can't get blogs",
  });
});

const updateBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
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

module.exports = {
  createNewBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
};
