const router = require("express").Router();
const { uploadCloud } = require("../config/cloudinary.config");
const ctrls = require("../controllers/productCategory.controller");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.get("/", ctrls.getCategories);
router.post(
  "/",
  [verifyAccessToken, isAdmin],
  uploadCloud.single("image"),
  ctrls.createCategory
);

router.put(
  "/:pcid",
  [verifyAccessToken, isAdmin],
  uploadCloud.single("image"),
  ctrls.updateCategory
);

router.delete("/:pcid", [verifyAccessToken, isAdmin], ctrls.deleteCategory);

module.exports = router;
