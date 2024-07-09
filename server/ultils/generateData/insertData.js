const { default: slugify } = require("slugify");
const productData = require("./data/products.json");
const productCateBrandData = require("./data/categories.json");
const roleData = require("./data/roles.json");
const userData = require("./data/users.json");
const Product = require("../../models/product.model");
const Category = require("../../models/productCategory.model");
const Role = require("../../models/role.model");
const userModel = require("../../models/user.model");

const fnProd = async (product) => {
  await Product.create({
    title: product?.name,
    slug: slugify(product?.name),
    description: product?.description,
    brand: product?.brand,
    price: Math.round(Number(product?.price.match(/\d/g).join("")) / 100),
    category: product?.category[1],
    quantity: Math.round(Math.random() * 1000),
    sold: Math.round(Math.random() * 100),
    images: product?.images,
    thumb: product?.thumb,
    color: product?.variants?.find((el) => el.label === "Color")?.variants[0],
    totalRatings: 0,
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

module.exports = {
  insertDataProductTest,
  insertDataBrandCategoryTest,
  insertDataRoleTest,
  insertDataUserTest,
};
