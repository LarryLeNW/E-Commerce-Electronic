const userRouter = require("./user.router");
const productRouter = require("./product.router");
const prodCategoryRouter = require("./productCategory.router");
const blogCategoryRouter = require("./blogCategory.router");
const blogRouter = require("./blog.router");
const counponRouter = require("./coupon.router");
const orderRouter = require("./order.router");
const { notFound, errHandler } = require("../middlewares/errHandler");

const initRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/prodcategory", prodCategoryRouter);
  app.use("/api/blogcategory", blogCategoryRouter);
  app.use("/api/blog", blogRouter);
  app.use("/api/coupon", counponRouter);
  app.use("/api/order", orderRouter);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRoutes;
