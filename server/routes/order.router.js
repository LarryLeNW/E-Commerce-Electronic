const router = require("express").Router();
const ctrls = require("../controllers/order.controller");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", verifyAccessToken, ctrls.createOrder);
router.get("/", verifyAccessToken, ctrls.getOrdersUser);
router.get("/:oid", verifyAccessToken, ctrls.getOrderUser);
router.put("/:oid", [verifyAccessToken, isAdmin], ctrls.updateStatusOrder);
router.get("/admin", [verifyAccessToken, isAdmin], ctrls.getOrders);

module.exports = router;
