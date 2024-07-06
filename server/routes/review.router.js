const router = require("express").Router();
const ctrls = require("../controllers/review.controller");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.put("/", verifyAccessToken, ctrls.createReview);
router.get("/", ctrls.getReviews);

module.exports = router;
