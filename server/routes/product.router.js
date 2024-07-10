const router = require("express").Router();
const ctrls = require("../controllers/product.controller");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploader = require("../config/cloudinary.config");

router.get("/:pid", ctrls.getProduct);
router.get("/", ctrls.getProducts);
router.put("/ratings", verifyAccessToken, ctrls.ratings);
router.post(
  "/",
  [verifyAccessToken, isAdmin],
  uploader.array("images", 10),
  ctrls.createProduct
);

router.delete("/:pid", [verifyAccessToken, isAdmin], ctrls.deleteProduct);

router.put(
  "/:pid",
  [verifyAccessToken, isAdmin],
  uploader.array("images", 10),
  ctrls.updateProduct
);

router.put(
  "/image/:pid",
  [verifyAccessToken, isAdmin],
  uploader.array("images", 10),
  ctrls.uploadImagesProduct
);
module.exports = router;
