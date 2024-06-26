const router = require("express").Router();
const ctrls = require("../controllers/order.controller");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", verifyAccessToken, ctrls.createOrder);
router.put("/:oid", [verifyAccessToken, isAdmin], ctrls.updateStatusOrder);
router.get("/", verifyAccessToken, ctrls.getOrderUser);
router.get("/admin", [verifyAccessToken, isAdmin], ctrls.getOrders);

module.exports = router;
