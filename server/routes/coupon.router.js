const router = require("express").Router();
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const ctrls = require("../controllers/counpon.controller");

router.post("/", [verifyAccessToken, isAdmin], ctrls.createCoupon);
router.get("/", ctrls.getCoupons);
router.put("/:cpid", [verifyAccessToken, isAdmin], ctrls.updateCoupon);
router.delete("/:cpid", [verifyAccessToken, isAdmin], ctrls.deleteCoupon);

module.exports = router;
