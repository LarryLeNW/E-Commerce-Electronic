const express = require("express");
const router = express.Router();
const ctrls = require("../controllers/payment.controller");
const { verifyAccessToken } = require("../middlewares/verifyToken");

router.post("/", verifyAccessToken, ctrls.paymentRequest);
router.get("/success", ctrls.successPage);
router.get("/cancel", ctrls.cancelPage);

module.exports = router;
