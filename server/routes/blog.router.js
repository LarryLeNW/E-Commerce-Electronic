const router = require("express").Router();
const ctrls = require("../controllers/blog.controller");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploader = require("../config/cloudinary.config");

router.post("/", [verifyAccessToken, isAdmin], ctrls.createNewBlog);
router.get("/", ctrls.getBlogs);
router.get("/:bid", ctrls.getBlog);
router.put("/:bid", [verifyAccessToken, isAdmin], ctrls.updateBlog);
router.delete("/:bid", [verifyAccessToken, isAdmin], ctrls.deleteBlog);
router.post("/react/:bid/:type", verifyAccessToken, ctrls.reactBlog);
router.put(
  "/image/:bid",
  [verifyAccessToken, isAdmin],
  uploader.single("image"),
  ctrls.uploadImageBlog
);

module.exports = router;
