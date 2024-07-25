const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const verifyAccessToken = asyncHandler(async (req, res, next) => {
  let token = req.cookies?.refreshToken;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err)
        return res.status(401).json({
          success: false,
          message: "Invalid access token",
        });
      req.user = decode;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Require authentication!!!",
    });
  }
});

const isAdmin = asyncHandler((req, res, next) => {
  const { role } = req.user;
  if (role !== "9120938109233")
    return res.status(401).json({
      success: false,
      message: " REQUIRE ADMIN ROLE",
    });
  next();
});

module.exports = {
  verifyAccessToken,
  isAdmin,
};
