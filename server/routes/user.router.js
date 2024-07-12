const router = require("express").Router();
const ctrls = require("../controllers/user.controller");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploader = require("../config/cloudinary.config");

router.post("/register", ctrls.register);
router.get("/confirmregiser/:tokenConfirm", ctrls.confirmRegister);
router.post("/login", ctrls.login);
router.post("/refreshtoken", ctrls.refreshAccessToken);
router.get("/logout", ctrls.logout);
router.post("/requestforgotpw", ctrls.requestForgotPw);
router.put("/resetpassword", ctrls.resetPassword);
router.put(
  "/changeAvatar",
  verifyAccessToken,
  uploader.single("image"),
  ctrls.changeAvatar
);
router.get("/current", verifyAccessToken, ctrls.getCurrent);
router.put("/current", verifyAccessToken, ctrls.updateUser);
router.get("/", [verifyAccessToken, isAdmin], ctrls.getUsers);
router.post("/mock", [verifyAccessToken, isAdmin], ctrls.createUsers);
router.delete("/:uid", [verifyAccessToken, isAdmin], ctrls.deleteUser);
router.put("/address", verifyAccessToken, ctrls.updateUserAddress);
router.put("/cart", verifyAccessToken, ctrls.updateCart);
router.put("/:uid", [verifyAccessToken, isAdmin], ctrls.updateUserByAdmin);

module.exports = router;
