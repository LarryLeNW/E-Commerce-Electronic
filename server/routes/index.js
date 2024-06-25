const userRouter = require("./user");
const productRouter = require("./product");
const prodCategoryRouter = require("./productCategory");
const blogCategoryRouter = require("./blogCategory");
const { notFound, errHandler } = require("../middlewares/errHandler");

const initRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/prodcategory", prodCategoryRouter);
  app.use("/api/blogcategory", blogCategoryRouter);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRoutes;