const router = require("express").Router();
const { uploadCloud } = require("../config/cloudinary.config");
const ctrls = require("../controllers/blog.controller");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post(
  "/",
  [verifyAccessToken, isAdmin],
  uploadCloud.single("image"),
  ctrls.createNewBlog
);
router.get("/", ctrls.getBlogs);
router.get("/:bid", ctrls.getBlog);
router.put(
  "/:bid",
  [verifyAccessToken, isAdmin],
  uploadCloud.single("image"),
  ctrls.updateBlog
);
router.delete("/:bid", [verifyAccessToken, isAdmin], ctrls.deleteBlog);
router.post("/react/:bid/:type", verifyAccessToken, ctrls.reactBlog);
router.put(
  "/image/:bid",
  [verifyAccessToken, isAdmin],
  uploadCloud.single("image"),
  ctrls.uploadImageBlog
);

module.exports = router;
