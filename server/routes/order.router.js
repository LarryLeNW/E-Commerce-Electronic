const router = require("express").Router();
const ctrls = require("../controllers/order.controller");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", verifyAccessToken, ctrls.createOrder);
router.get("/", verifyAccessToken, ctrls.getOrdersUser);
router.get("/admin", [verifyAccessToken, isAdmin], ctrls.getOrdersByAdmin);
router.get("/:oid", verifyAccessToken, ctrls.getOrderUser);
router.put("/:oid", [verifyAccessToken, isAdmin], ctrls.updateStatusOrder);
router.delete("/:oid", [verifyAccessToken, isAdmin], ctrls.deleteOrder);

module.exports = router;
