const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const jwt = require("jsonwebtoken");
const sendMail = require("../ultils/sendMail");
const crypto = require("crypto");

const register = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username)
    return res.status(400).json({
      success: false,
      message: "Missing inputs",
    });

  const user = await User.findOne({ email });
  if (user) throw new Error("Email đã có người sử dụng ...");
  else {
    let tokenRegister = crypto.randomBytes(16).toString("hex");
    res.cookie(
      "dataRegister",
      { ...req.body, tokenRegister },
      {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      }
    );

    const html =
      "<h1>Welcome to TechShop </h1>" +
      "<div>Xin vui lòng click vào xác nhận để hoàn tất thủ tục đăng kí tài khoản bên TechShop </div>" +
      "<div>Link này sẽ hết hạn trong 15p kể từ bây giờ </div>" +
      `<a href="${process.env.URL_SERVER}/api/user/confirmregiser/${tokenRegister}">Xác nhận</a>`;

    await sendMail({
      email,
      html,
      subject: "Hoàn tất đăng kí tài khoảng TechShop",
    });

    console.log("send emaill... ");

    return res.status(200).json({
      success: true,
      message: `Chúng tôi đã gửi email đến  <a href="https://mail.google.com"  target="_blank">${email}</a> , vui lòng kiểm tra email để hoàn tất đăng kí, xin cảm ơn...`,
    });
  }
});

const confirmRegister = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  const { tokenConfirm } = req.params;

  if (!cookie || cookie?.dataRegister?.tokenRegister != tokenConfirm) {
    res.clearCookie("dataRegister");
    return res.redirect(`${process.env.URL_CLIENT}/confirm-register/failed`);
  }

  const { tokenRegister, ...dataRegister } = cookie.dataRegister;
  const newUser = await User.create(dataRegister);

  res.clearCookie("dataRegister");
  if (newUser)
    res.redirect(`${process.env.URL_CLIENT}/confirm-register/success`);
  else res.redirect(`${process.env.URL_CLIENT}/confirm-register/failed`);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      success: false,
      message: "Missing inputs",
    });
  // plain object
  const response = await User.findOne({ email });
  if (response && (await response.isCorrectPassword(password))) {
    const { password, refreshToken, ...userData } = response.toObject();

    const accessToken = generateAccessToken(response._id, userData.role);

    const newRefreshToken = generateRefreshToken(response._id);

    // Lưu refresh token vào database
    await User.findByIdAndUpdate(
      response._id,
      { refreshToken: newRefreshToken },
      { new: true }
    );

    // Lưu refresh token vào cookie
    res.cookie("refreshToken", accessToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: true,
    });

    return res.status(200).json({
      success: true,
      accessToken,
      data: userData,
    });
  } else {
    throw new Error("Tài khoản hoặc mật khẩu sai!");
  }
});

const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select("-refreshToken -password ");

  return res.status(200).json({
    success: !!user,
    data: user || "Token không nhận dạng được ...",
  });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  // Lấy token từ cookies
  const cookie = req.cookies;
  // Check xem có token hay không
  if (!cookie && !cookie.refreshToken)
    throw new Error("No refresh token in cookies");
  // Check token có hợp lệ hay không
  const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);

  const response = await User.findOne({
    _id: rs._id,
    refreshToken: cookie.refreshToken,
  });

  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response
      ? generateAccessToken(response._id, response.role)
      : "Refresh token not matched",
  });
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken)
    throw new Error("No refresh token in cookies");
  // Xóa refresh token ở db
  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: "" },
    { new: true }
  );
  // Xóa refresh token ở cookie trình duyệt
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    success: true,
    message: "Logout is done",
  });
});

const requestForgotPw = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new Error("Missing email");
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  const resetToken = user.createPasswordChangedToken();
  await user.save();

  const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.URL_CLIENT}/forgot-password/${resetToken}>Click here</a>`;

  const resSendMail = await sendMail({
    email,
    html,
    subject: "Reset Account TechShop",
  });

  return res.status(200).json({
    success: resSendMail?.response?.includes("OK"),
    message: resSendMail?.response?.includes("OK")
      ? "Chúng tôi đã gửi yêu cầu đến email của bạn vui lòng truy cập để hoàn thành thay đổi mật khẩu.."
      : "Đã có lỗi vui lòng thử lại sau...",
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  if (!password || !token) throw new Error("Missing imputs");

  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) throw new Error("Invalid reset token");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordChangedAt = Date.now();
  user.passwordResetExpires = undefined;
  await user.save();
  return res.status(200).json({
    success: user ? true : false,
    message: user ? "Cập nhật mật khẩu thành công !" : "Something went wrong",
  });
});

const createUsers = asyncHandler(async (req, res) => {
  const response = await User.create(req.body);
  return res.status(201).json({
    success: response ? true : false,
    updatedUser: response ? response : "Some thing went wrong",
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const excludeFields = ["limit", "sort", "page", "fields", "q"];
  excludeFields.forEach((el) => delete queries[el]);

  // format operators for mongoose compare syntax
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (el) => `$${el}`);
  let formattedQueries = JSON.parse(queryString);

  // filtering
  if (req.query.q) {
    formattedQueries["$or"] = [
      { username: { $regex: req.query.q, $options: "i" } },
      { email: { $regex: req.query.q, $options: "i" } },
    ];
  }

  // Aggregation pipeline stages
  const pipeline = [];

  // Match stage
  pipeline.push({ $match: formattedQueries });

  // Lookup stage to join with roles collection
  // pipeline.push({
  //   $lookup: {
  //     from: "roles",
  //     localField: "role",
  //     foreignField: "code",
  //     as: "roleInfo",
  //   },
  // });

  // Sorting stage
  if (req.query.sort) {
    let sortBy = req.query.sort.split(",").join(" ");
    pipeline.push({ $sort: sortBy });
  }

  // Fields limiting stage
  if (req.query.fields) {
    let fields = req.query.fields.split(",").join(" ");
    pipeline.push({ $project: fields });
  }

  // Pagination stage
  const page = +req.query.page || 1;
  const limit = +req.query.limit || +process.env.LIMIT_PRODUCT;
  const skip = (page - 1) * limit;
  pipeline.push({ $skip: skip });
  pipeline.push({ $limit: limit });

  // Perform aggregation
  const users = await User.aggregate(pipeline);

  // Count documents matching the filters
  const counts = await User.countDocuments(formattedQueries);

  res.status(200).json({
    success: true,
    data: users,
    counts: counts,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  if (!uid) throw new Error("Missing inputs");
  const response = await User.findByIdAndDelete(uid);
  return res.status(200).json({
    success: !!response,
    message: response
      ? `User with email ${response.email} deleted`
      : "No user delete",
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).select("-password -role -refreshToken");

  return res.status(200).json({
    success: response ? true : false,
    data: response || "Some thing went wrong",
  });
});

const updateUserByAdmin = asyncHandler(async (req, res) => {
  //
  const { uid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(uid, req.body, {
    new: true,
  }).select("-password -role -refreshToken");

  return res.status(200).json({
    success: !!response,
    updatedUser: response || "Some thing went wrong",
  });
});

const updateUserAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!req.body.address) throw new Error("Missing inputs");

  const user = await User.findById(_id).select("-password -role -refreshToken");
  if (!user) throw new Error("User not found");

  if (user.address.includes(req.body.address)) {
    return res.status(400).json({
      success: false,
      message: "Address already exists",
    });
  }

  user.address.push(req.body.address);
  const response = await user.save();

  return res.status(200).json({
    success: response ? true : false,
    updatedUser: response ? response : "Some thing went wrong",
  });
});

const changeAvatar = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const avatar = req.file.path;
  const response = await User.findByIdAndUpdate(_id, { avatar }, { new: true });
  res.status(200).json({
    success: !!response,
    message: "Avatar updated successfully",
    avatar,
  });
});

module.exports = {
  register,
  login,
  getCurrent,
  refreshAccessToken,
  logout,
  requestForgotPw,
  resetPassword,
  getUsers,
  deleteUser,
  updateUser,
  updateUserByAdmin,
  updateUserAddress,
  confirmRegister,
  createUsers,
  changeAvatar,
};
