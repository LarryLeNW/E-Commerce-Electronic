const asyncHandler = require("express-async-handler");
const Blog = require("../models/blog.model");

const createNewBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { title, description, category } = req.body;

  if (!title || !description || !category) throw new Error("Missing inputs");

  const response = await Blog.create({ ...req.body, author: _id });
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
  ).populate({
    path: "interactions.user",
    select: "firstname lastname ",
  });
  return res.json({
    success: response ? true : false,
    blog: response || "Can't get blogs",
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
