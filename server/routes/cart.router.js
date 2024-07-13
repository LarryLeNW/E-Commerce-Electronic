const router = require("express").Router();
const ctrls = require("../controllers/cart.controller");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.put("/", verifyAccessToken, ctrls.updateCart);
router.delete("/:pid", verifyAccessToken, ctrls.removeItemCart);

module.exports = router;
