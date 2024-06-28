const { default: slugify } = require("slugify");
const productData = require("../config/products.json");
const productCate_Brand = require("../config/categories.json");
const Product = require("../models/product.model");
const Category = require("../models/productCategory.model");

const fn = async (product) => {
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
    totalRatings: Math.round(Math.random() * 5),
  });
};

const insertDataProductTest = async () => {
  try {
    const promises = [];
    for (let p of productData) promises.push(fn(p));
    await Promise.all(promises);
    console.log("done insert data product");
  } catch (error) {
    console.log("🚀 ~ insertDataProductTest ~ error:", error);
  }
};

const fn2 = async (item) => {
  await Category.create({
    title: item?.cate,
    brand: item?.brand,
    thumb: item?.thumb,
  });
};

const insertDataBrandCategoryTest = async () => {
  try {
    const promises = [];
    for (let cate of productCate_Brand) promises.push(fn2(cate));
    await Promise.all(promises);
    console.log("done insert data category");
  } catch (error) {
    console.log("🚀 ~ insertDataBrandCategoryTest ~ error:", error);
  }
};

module.exports = {
  insertDataProductTest,
  insertDataBrandCategoryTest,
};
