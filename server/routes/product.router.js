const router = require("express").Router();
const ctrls = require("../controllers/product.controller");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploader = require("../config/cloudinary.config");

router.get("/:pid", ctrls.getProduct);
router.get("/", ctrls.getProducts);
router.post("/", [verifyAccessToken, isAdmin], ctrls.createProduct);
router.put("/:pid", [verifyAccessToken, isAdmin], ctrls.updateProduct);
router.delete("/:pid", [verifyAccessToken, isAdmin], ctrls.deleteProduct);
router.put("/ratings", verifyAccessToken, ctrls.ratings);
router.put(
  "/image/:pid",
  [verifyAccessToken, isAdmin],
  uploader.array("images", 10),
  ctrls.uploadImagesProduct
);
module.exports = router;
