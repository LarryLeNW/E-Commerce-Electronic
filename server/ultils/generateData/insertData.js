const { default: slugify } = require("slugify");
const productData = require("./data/products.json");
const productCateBrandData = require("./data/categories.json");
const blogCategoryData = require("./data/blog.categories.json");
const blogData = require("./data/blog.json");
const roleData = require("./data/roles.json");
const userData = require("./data/users.json");
const Product = require("../../models/product.model");
const Category = require("../../models/productCategory.model");
const Role = require("../../models/role.model");
const userModel = require("../../models/user.model");
const blogCategoryModel = require("../../models/blogCategory.model");
const blogModel = require("../../models/blog.model");

const fnProd = async (product) => {
  await Product.create({
    title: product?.title,
    slug: slugify(product?.title),
    description: product?.description,
    brand: product?.brand,
    price: product?.price,
    category: product?.category,
    quantity: Math.round(Math.random() * 1000),
    sold: Math.round(Math.random() * 100),
    images: product?.images,
    thumb: product?.thumb,
    color: product?.color,
    totalRatings: 0,
    variants: product?.variants,
  });
};

const insertDataProductTest = async () => {
  try {
    const promises = [];
    for (let p of productData) promises.push(fnProd(p));
    await Promise.all(promises);
    console.log("done insert data product");
  } catch (error) {}
};

const fnCate = async (item) => {
  await Category.create(item);
};

const insertDataBrandCategoryTest = async () => {
  try {
    const promises = [];
    for (let cate of productCateBrandData) promises.push(fnCate(cate));
    await Promise.all(promises);
    console.log("done insert data category");
  } catch (error) {
    console.log("🚀 ~ insertDataBrandCategoryTest ~ error:", error);
  }
};

const fnRole = async (item) => {
  await Role.create(item);
};

const insertDataRoleTest = async () => {
  try {
    const promises = [];
    for (let role of roleData) promises.push(fnRole(role));
    await Promise.all(promises);
    console.log("done insert data role");
  } catch (error) {
    console.log("🚀 ~ insertDataRoleTest ~ error:", error);
  }
};

const fnUser = async (item) => {
  await userModel.create(item);
};

const insertDataUserTest = async () => {
  try {
    const promises = [];
    for (let user of userData) promises.push(fnUser(user));
    await Promise.all(promises);
    console.log("done insert data user");
  } catch (error) {
    console.log("🚀 ~ insertDataRoleTest ~ error:", error);
  }
};

const insertDataBlogCategoryTest = async () => {
  const fnBlogCategory = async (item) => {
    await blogCategoryModel.create(item);
  };

  try {
    const promises = [];
    for (let data of blogCategoryData) promises.push(fnBlogCategory(data));
    await Promise.all(promises);
    console.log("done insert category blog ");
  } catch (error) {
    console.log("🚀 ~ insertDataBlogCategoryTest ~ error:", error);
  }
};

const insertDataBlogTest = async () => {
  const fnBlog = async (item) => {
    await blogModel.create(item);
  };

  try {
    const promises = [];
    for (let data of blogData) promises.push(fnBlog(data));
    await Promise.all(promises);
    console.log("done insert blog ");
  } catch (error) {
    console.log("🚀 ~ insertDataBlogTest ~ error:", error);
  }
};

module.exports = {
  insertDataProductTest,
  insertDataBrandCategoryTest,
  insertDataRoleTest,
  insertDataUserTest,
  insertDataBlogCategoryTest,
  insertDataBlogTest,
};
