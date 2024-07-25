const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/dbconnect");
const initRoutes = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const {
  insertDataProductTest,
  insertDataBrandCategoryTest,
  insertDataRoleTest,
  insertDataUserTest,
  insertDataBlogCategoryTest,
  insertDataBlogTest,
} = require("./ultils/generateData/insertData");
const { deleteFilesInFolder } = require("./config/cloudinary.config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.URL_CLIENT,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(cookieParser());

const port = process.env.PORT || 8888;

dbConnect();
initRoutes(app);

app.listen(port, () => {
  console.log("Server running on the port: " + port);
});
